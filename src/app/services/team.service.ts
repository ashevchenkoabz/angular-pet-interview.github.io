import { Injectable } from '@angular/core';
import {Team} from '../models/team.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public teams: Team[] = [
    new Team('1', 'Blue team', 0),
    new Team('2', 'Red team', 0),
  ];
  public teamsPool: Team[] = [
    new Team('3', 'Yellow team', 0),
    new Team('4', 'Green team', 0),
    new Team('5', 'Orange team', 0),
    new Team('6', 'Cyan team', 0),
    new Team('7', 'Magenta team', 0),
    new Team('8', 'Black team', 0),
    new Team('9', 'White team', 0),
  ];
  public readonly MIN_TEAMS_COUNT = 2;

  public teams$: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>(this.teams);
  public poolEmpty$: Subject<boolean> = new Subject<boolean>();

  public addTeam(): void {
    const team = this.teamsPool.shift();
    if (team) {
      this.teams.push(team);
      this.teams$.next(this.teams);
    } else {
      this.poolEmpty$.next(true);
    }
  }

  public releaseTeam(): void {
    const team = this.teams.pop();
    if (this.teams.length >= this.MIN_TEAMS_COUNT) {
      team.score = 0;
      this.teamsPool.push(team);
      this.teams$.next(this.teams);
      this.poolEmpty$.next(false);
    }
  }

  public voteTeam(index, vote): void {
    const team = this.teams[index];
    team.score += vote;
    team.score = team.score <= 0 ? 0 : team.score;
    this.teams$.next(this.teams);
  }
}
