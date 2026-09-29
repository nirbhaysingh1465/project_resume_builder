import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  TabStopPosition,
  TabStopType,
  convertInchesToTwip,
  ExternalHyperlink,
} from 'docx';
import { saveAs } from 'file-saver';
import { ResumeRecord } from '../types/resume';

// ─── Helpers ───────────────────────────────────────────────────────

/** Split multi-line text into non-empty bullet strings */
const getBullets = (text?: string): string[] => {
  if (!text) return [];
  return text.split('\n').map(s => s.trim().replace(/^[•\-\*]\s*/, '')).filter(Boolean);
};

/** Convert hex colour like '#163a5f' to '163a5f' */
const hexClean = (hex: string) => hex.replace('#', '');

/** Create a styled section heading paragraph */
const sectionHeading = (title: string, themeColor: string): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22, // 11pt
        color: hexClean(themeColor),
        font: 'Inter',
      }),
    ],
    spacing: { before: 260, after: 80 },
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: hexClean(themeColor),
      },
    },
  });
};

/** Create a bullet-point paragraph */
const bulletParagraph = (text: string): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20, // 10pt
        font: 'Inter',
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: 40 },
  });
};

/** Create a normal text paragraph */
const textParagraph = (text: string, options?: { bold?: boolean; italic?: boolean; size?: number; color?: string; alignment?: (typeof AlignmentType)[keyof typeof AlignmentType] }): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: options?.bold,
        italics: options?.italic,
        size: options?.size ?? 20,
        color: options?.color ? hexClean(options.color) : undefined,
        font: 'Inter',
      }),
    ],
    spacing: { after: 40 },
    alignment: options?.alignment,
  });
};

/** Experience / Project entry with role—company left-aligned and period right-aligned */
const entryHeader = (left: string, right: string, bold = true): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text: left,
        bold,
        size: 20,
        font: 'Inter',
      }),
      new TextRun({
        text: `\t${right}`,
        size: 20,
        font: 'Inter',
        color: '64748b',
      }),
    ],
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    spacing: { before: 120, after: 20 },
  });
};

// ─── Main Export Function ──────────────────────────────────────────

export async function generateWordDocument(resume: ResumeRecord): Promise<void> {
  const { data, enabledSections, themeColor } = resume;
  const sections: Paragraph[] = [];

  // ── 1. Name & Title ──
  if (data.fullName) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.fullName,
            bold: true,
            size: 36, // 18pt
            color: hexClean(themeColor),
            font: 'Inter',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
      })
    );
  }

  const subtitle = data.devRole || data.jobTitle || data.currentDegree || data.designation;
  if (subtitle) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: subtitle,
            size: 22,
            color: '64748b',
            font: 'Inter',
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
      })
    );
  }

  // Academic subtitle (department + institution)
  if (data.department || data.institution) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: [data.department, data.institution].filter(Boolean).join(', '),
            size: 20,
            color: '475569',
            font: 'Inter',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
      })
    );
  }

  // ── 2. Contact Line ──
  const contactParts: string[] = [];
  if (data.email) contactParts.push(`Email: ${data.email}`);
  if (data.phone) contactParts.push(`Phone: ${data.phone}`);
  if (data.location) contactParts.push(data.location);
  if (data.linkedin) contactParts.push(`LinkedIn: ${data.linkedin}`);
  if (data.github) contactParts.push(`GitHub: ${data.github}`);
  if (data.portfolio) contactParts.push(`Portfolio: ${data.portfolio}`);
  if (data.scholar) contactParts.push(`Google Scholar: ${data.scholar}`);
  if (data.orcid) contactParts.push(`ORCID: ${data.orcid}`);
  if (data.researchGate) contactParts.push(`ResearchGate: ${data.researchGate}`);

  if (contactParts.length > 0) {
    sections.push(
      new Paragraph({
        children: contactParts.flatMap((part, idx) => {
          const runs: TextRun[] = [];
          if (idx > 0) {
            runs.push(new TextRun({ text: '  |  ', size: 18, color: '94a3b8', font: 'Inter' }));
          }
          runs.push(new TextRun({ text: part, size: 18, font: 'Inter', color: '334155' }));
          return runs;
        }),
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
      })
    );
  }

  // Divider line after header
  sections.push(
    new Paragraph({
      spacing: { before: 40, after: 80 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: hexClean(themeColor) },
      },
    })
  );

  // ── 3. Summary / Objective ──
  if ((enabledSections.objective !== false || enabledSections.summary !== false) && data.summaryText) {
    sections.push(sectionHeading('Objective / Summary', themeColor));
    sections.push(textParagraph(data.summaryText, { alignment: AlignmentType.JUSTIFIED }));
  }

  // ── 4. Education ──
  if (enabledSections.education !== false && data.educationList && data.educationList.length > 0) {
    sections.push(sectionHeading('Education Qualifications', themeColor));

    const headerRow = new TableRow({
      tableHeader: true,
      children: ['Qualification', 'College / Institute', 'Board / University', 'Year', 'Score'].map(
        (label) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: label, bold: true, size: 18, font: 'Inter', color: '1e293b' }),
                ],
              }),
            ],
            shading: { type: ShadingType.SOLID, color: 'f1f5f9' },
            width: { size: 20, type: WidthType.PERCENTAGE },
          })
      ),
    });

    const dataRows = data.educationList.map(
      (edu) =>
        new TableRow({
          children: [edu.degree, edu.institute, edu.board || '—', edu.year, edu.score || '—'].map(
            (val) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: val, size: 18, font: 'Inter' })],
                  }),
                ],
                width: { size: 20, type: WidthType.PERCENTAGE },
              })
          ),
        })
    );

    const eduTable = new Table({
      rows: [headerRow, ...dataRows],
      width: { size: 100, type: WidthType.PERCENTAGE },
    });

    // We can't push a Table to paragraphs array directly — we'll collect tables separately
    // Actually docx allows both Paragraph and Table in Document children
    // We'll handle this by building the final children array at the end
    // For now, mark a placeholder
    (sections as any).push(eduTable);
  }

  // ── 5. Experience ──
  if (enabledSections.experience !== false && data.experienceList && data.experienceList.length > 0) {
    sections.push(sectionHeading('Work Experience', themeColor));
    data.experienceList.forEach((exp) => {
      const titleParts = [exp.role, exp.company].filter(Boolean).join(' — ');
      sections.push(entryHeader(titleParts, exp.period || ''));
      if (exp.location) {
        sections.push(textParagraph(exp.location, { italic: true, size: 18, color: '#64748b' }));
      }
      if (exp.details) {
        getBullets(exp.details).forEach((b) => sections.push(bulletParagraph(b)));
      }
    });
  }

  // ── 6. Technical Skills (Developer) ──
  if (enabledSections.tech_skills !== false && (data.devLanguages || data.devFrameworks || data.devDatabases || data.devTools)) {
    sections.push(sectionHeading('Technical Skills', themeColor));
    if (data.devLanguages) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Programming Languages: ', bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: data.devLanguages, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    }
    if (data.devFrameworks) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Frameworks & Libraries: ', bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: data.devFrameworks, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    }
    if (data.devDatabases) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Databases & Cloud: ', bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: data.devDatabases, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    }
    if (data.devTools) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Developer Tools: ', bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: data.devTools, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    }
  }

  // ── 7. Skills (General) ──
  if (enabledSections.skills !== false && data.skillsText) {
    sections.push(sectionHeading('Technical & Soft Skills', themeColor));
    getBullets(data.skillsText).forEach((s) => sections.push(bulletParagraph(s)));
  }

  // ── 8. Projects ──
  if ((enabledSections.projects !== false || enabledSections.academic_projects !== false) && data.projectsList && data.projectsList.length > 0) {
    sections.push(sectionHeading('Projects', themeColor));
    data.projectsList.forEach((proj) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.title, bold: true, size: 20, font: 'Inter' }),
            ...(proj.link
              ? [
                  new TextRun({ text: '  ', size: 20, font: 'Inter' }),
                  new TextRun({ text: `[${proj.link}]`, size: 18, font: 'Inter', color: '2563eb' }),
                ]
              : []),
          ],
          spacing: { before: 120, after: 20 },
        })
      );
      if (proj.stack) {
        sections.push(textParagraph(`Technologies: ${proj.stack}`, { size: 18, color: themeColor }));
      }
      if (proj.desc) {
        getBullets(proj.desc).forEach((b) => sections.push(bulletParagraph(b)));
      }
    });
  }

  // ── 9. Certifications ──
  if (enabledSections.certifications !== false && data.certificationsText) {
    sections.push(sectionHeading('Certifications', themeColor));
    getBullets(data.certificationsText).forEach((c) => sections.push(bulletParagraph(c)));
  }

  // ── 10. Workshops ──
  if (enabledSections.workshops !== false && data.workshopsText) {
    sections.push(sectionHeading('Workshops & Training', themeColor));
    getBullets(data.workshopsText).forEach((w) => sections.push(bulletParagraph(w)));
  }

  // ── 11. Achievements ──
  if ((enabledSections.achievements !== false || enabledSections.awards !== false) && data.achievementsText) {
    sections.push(sectionHeading('Achievements & Awards', themeColor));
    getBullets(data.achievementsText).forEach((a) => sections.push(bulletParagraph(a)));
  }

  // ── 12. Key Strengths ──
  if (enabledSections.strengths !== false && data.strengthsText) {
    sections.push(sectionHeading('Key Strengths', themeColor));
    getBullets(data.strengthsText).forEach((s) => sections.push(bulletParagraph(s)));
  }

  // ── 13. Hobbies ──
  if (enabledSections.hobbies !== false && data.hobbiesText) {
    sections.push(sectionHeading('Hobbies & Interests', themeColor));
    getBullets(data.hobbiesText).forEach((h) => sections.push(bulletParagraph(h)));
  }

  // ── 14. Publications (Academic) ──
  if (enabledSections.publications !== false && data.publicationsList) {
    sections.push(sectionHeading('Publications & Research Papers', themeColor));
    getBullets(data.publicationsList).forEach((pub, idx) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${idx + 1}. `, bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: pub, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 60 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    });
  }

  // ── 15. Patents ──
  if (enabledSections.patents !== false && data.patentsList) {
    sections.push(sectionHeading('Patents & Innovations', themeColor));
    getBullets(data.patentsList).forEach((pat, idx) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${idx + 1}. `, bold: true, size: 20, font: 'Inter' }),
            new TextRun({ text: pat, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    });
  }

  // ── 16. Grants ──
  if (enabledSections.grants !== false && data.grantsList) {
    sections.push(sectionHeading('Sponsored Research Grants', themeColor));
    getBullets(data.grantsList).forEach((g) => sections.push(bulletParagraph(g)));
  }

  // ── 17. FDPs ──
  if (enabledSections.fdp !== false && data.fdpList) {
    sections.push(sectionHeading('Faculty Development Programmes & Workshops', themeColor));
    getBullets(data.fdpList).forEach((f) => sections.push(bulletParagraph(f)));
  }

  // ── 18. Personal Details ──
  if (enabledSections.personal !== false && (data.fatherName || data.motherName || data.dob || data.languages || data.permanentAddress)) {
    sections.push(sectionHeading('Personal Details', themeColor));
    const details: [string, string][] = [];
    if (data.fatherName) details.push(["Father's Name", data.fatherName]);
    if (data.motherName) details.push(["Mother's Name", data.motherName]);
    if (data.dob) details.push(['Date of Birth', data.dob]);
    if (data.languages) details.push(['Languages Known', data.languages]);
    if (data.permanentAddress) details.push(['Permanent Address', data.permanentAddress]);

    details.forEach(([label, value]) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${label}: `, bold: true, size: 20, font: 'Inter', color: '1e293b' }),
            new TextRun({ text: value, size: 20, font: 'Inter' }),
          ],
          spacing: { after: 40 },
        })
      );
    });
  }

  // ── 19. Declaration ──
  if (enabledSections.declaration !== false && data.declarationText) {
    sections.push(sectionHeading('Declaration', themeColor));
    sections.push(textParagraph(data.declarationText, { alignment: AlignmentType.JUSTIFIED }));

    // Date / Place + Signature
    const declParts: TextRun[] = [];
    if (data.decDate) declParts.push(new TextRun({ text: `Date: ${data.decDate}`, size: 20, font: 'Inter' }));
    if (data.decDate && data.decPlace) declParts.push(new TextRun({ text: '     ', size: 20 }));
    if (data.decPlace) declParts.push(new TextRun({ text: `Place: ${data.decPlace}`, size: 20, font: 'Inter' }));

    if (declParts.length > 0) {
      sections.push(new Paragraph({ children: declParts, spacing: { before: 200, after: 20 } }));
    }

    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: '\n\n________________________', size: 20, font: 'Inter' }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { before: 300 },
      })
    );
    sections.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Applicant Signature', bold: true, size: 20, font: 'Inter', color: '1e293b' }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 40 },
      })
    );
  }

  // ── Build Document ──
  const doc = new Document({
    creator: 'ProResume Builder',
    title: resume.title || 'Resume',
    description: `Resume of ${data.fullName || 'Applicant'}`,
    styles: {
      default: {
        document: {
          run: {
            font: 'Inter',
            size: 20,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(8.27),  // A4 width
              height: convertInchesToTwip(11.69), // A4 height
            },
            margin: {
              top: convertInchesToTwip(0.6),
              bottom: convertInchesToTwip(0.6),
              left: convertInchesToTwip(0.7),
              right: convertInchesToTwip(0.7),
            },
          },
        },
        children: sections as any[], // contains both Paragraph and Table objects
      },
    ],
  });

  // ── Generate & Download ──
  const blob = await Packer.toBlob(doc);
  const safeName = (data.fullName || 'Resume').replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  saveAs(blob, `Resume_${safeName}.docx`);
}
