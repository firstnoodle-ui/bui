/**
 * Instance flow is when a flow is instantiated
 * for students in a specific CourseInstance
 */
export type InstaceFlow = {
  id: string;
  flow: Flow;
  message: string;
  publishAt: Date;
  deadlineAt: Date;
};

export type Flow = {
  title: string;
  steps: FlowStep[];
};

export type FlowStep = {
  title: string;
  body: string;
  context: File;
  answer: string;
};

/**
 * In the UI
 * Flow title in header editable
 *
 * Each flow has an index number and can be dragged
 * Collapsable with the title as header
 *
 */
