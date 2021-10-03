import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit {
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  layersControl = {
    baseLayers: {
      'street Maps': this.streetMaps,
      'wikimedia Maps': this.wMaps
    }
  };

  options = {
    layers: [ this.streetMaps],
    zoom: 2,
    center: latLng([ 0, 0 ])
  };

  drawItems: L.FeatureGroup = L.featureGroup();

drawOptions = {
  position: 'topright',
	edit: {
		featureGroup: this.drawItems
	}
};

  constructor(private modalCtrl: ModalController,private  http: HttpClient , private route: Router) {}

  ngOnInit() {
 
  
  }
  ionViewDidEnter(){
  }

  public onDrawCreated(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Created Event!');

		const layer = (e as L.DrawEvents.Created).layer;
    console.log(layer);
		this.drawItems.addLayer(layer);
    this.modalCtrl.create({component: AddPostComponent})
    .then(modelEl => {modelEl.present();});
	}

  onMapReady(map: L.Map) {
    setTimeout(() => {
       map.invalidateSize();
    }, 200);
    

this.getData(map);
   

    

   
  }

  charts(){
      console.log("hi");
   // this.route.navigateByUrl('/auth');
  }
 
  getData(map: L.Map)
  {
    
    this.http.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=')
    .subscribe(datas=>{
     
      for (var i =0;i <223;i++){
        var casesString = `${datas[i].cases}`;

        if ( datas[i].cases > 1000 ) {
          casesString = `${casesString.slice(0, -3)}k+`
        }
        var j= datas[i].population/100000;
       
        if(datas[i].todayCases<50){
        var iconcolor="icon-marker-green";
        }else if (datas[i].todayCases>2000){
          var iconcolor="icon-marker-red";
        }else{
          var iconcolor="icon-marker-orange";
        }

        var lastupdate = new Date(datas[i].updated);
        const html = `<div>
        <span class=${iconcolor}>
          <span class="icon-marker-tooltip">
            <h2>${datas[i].country}</h2>
            <ul>
            <li><img class="img" src="${datas[i].countryInfo.flag}"></li>
              <li><strong>Confirmed:</strong> ${datas[i].cases}</li>
              <li><strong>Deaths:</strong> ${datas[i].deaths}</li>
              <li><strong>Recovered:</strong> ${datas[i].recovered}</li>
              <li><strong>Active:</strong> ${datas[i].active}</li>
              <li><strong>Last updated:</strong> ${lastupdate}</li>
           
            </ul>
          </span>
          ${ casesString}
        </span>
        </div>
      `;
        L.marker([datas[i].countryInfo.lat, datas[i].countryInfo.long], {icon:   L.divIcon({
          className: 'icon',html
        }),
        riseOnHover: true})
        
          .addTo(map);
        
            
          }
    });
    
  }

}
