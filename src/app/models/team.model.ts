export interface ITeam {
  id: string;
  name: string;
  score: number;
}

export class Team implements ITeam {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public score: number,
  ) {}
}
