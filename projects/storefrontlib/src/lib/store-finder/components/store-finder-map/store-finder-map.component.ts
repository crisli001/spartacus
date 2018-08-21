import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-store-finder-map',
  templateUrl: './store-finder-map.component.html',
  styleUrls: ['./store-finder-map.component.scss']
})
export class StoreFinderMapComponent implements OnChanges {
  @ViewChild('mapElement') private mapElement: ElementRef;
  @Input() private locations: any;

  constructor(
    private googleMapRendererService: GoogleMapRendererService,
    private store: Store<fromStore.StoresState>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.locations && this.locations.stores) {
      this.googleMapRendererService.renderMap(
        this.mapElement.nativeElement,
        this.locations.stores
      );
    }
  }

  /**
   * Sets the center of the map to the given location
   * @param latitude latitude of the new center
   * @param longitude longitude of the new center
   */
  public centerMap(latitude: number, longitude: number): void {
    this.googleMapRendererService.centerMap(latitude, longitude);
  }
}
