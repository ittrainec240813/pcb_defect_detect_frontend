export interface InferenceResult {
  name: string;
  class: number;
  confidence: number;
  box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface InferenceResponse {
  results: InferenceResult[];
}
