export interface DocSection {
  id: string;
  title: string;
  content: string[];
}

export interface ExampleLink {
  label: string;
  route: string;
}

export interface DocPage {
  slug: string;
  title: string;
  subtitle: string;
  interviewFocus: string;
  sections: DocSection[];
  answerSnippets: string[];
  exampleLinks: ExampleLink[];
}
