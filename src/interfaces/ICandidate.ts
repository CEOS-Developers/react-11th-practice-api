export interface ICandidate {
  _id: number;
  name: string;
  voteCount: number;
}

export interface ICandidateInputDTO {
  name: string;
}
