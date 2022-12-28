import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Team} from './models/team.model';
import {TeamService} from './services/team.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public teams$: Observable<Team[]>;
  public poolEmpty$: Observable<boolean>;

  constructor(public readonly teamsService: TeamService) {
    this.teams$ = this.teamsService.teams$;
    this.poolEmpty$ = this.teamsService.poolEmpty$;
  }
}
