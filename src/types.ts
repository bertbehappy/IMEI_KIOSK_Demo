export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 99;

export interface SurveyState {
  consent?: boolean;
  phone?: string;
  ageOver55?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  text?: string;
}
