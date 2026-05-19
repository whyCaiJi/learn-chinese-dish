export interface WikiTableRow {
  col1: string;
  col1_en: string;
  col2: string;
  col2_en: string;
  col3?: string;
  col3_en?: string;
}

export interface WikiSection {
  type: "text" | "formula" | "rules" | "table";
  title?: string;
  title_en?: string;
  content?: string;
  content_en?: string;
  items?: { zh: string; en: string }[];
  headers?: { zh: string; en: string }[];
  rows?: WikiTableRow[];
}

export interface WikiEntry {
  id: string;
  icon: string;
  title: string;
  title_en: string;
  category: string;
  category_en: string;
  summary: string;
  summary_en: string;
  sections: WikiSection[];
}
