import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { image_face_default, PerfilDTO } from 'src/app/Class/perfil-class';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {


  dni_actual!: number;
  //
  dni_about!: number;
  imagen_perfil: String[]=[];
  constructor(
    private misDatosService: InyectorDataService,
    private cd:ChangeDetectorRef
  ) {
    // this.images = [...this.images
    //   , '../../../assets/Homer-simpson.jpg'
    //   /*,'../../../assets/Cumpleaños de Homero Simpson.jpg'
    //   /*, 'https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2013/10/31/131031121826_homero_624x351_rexfeatures.jpg'
    //   , 'data:image/jpeg;base64,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'*/
    // ]
    this.imagen_perfil=[image_face_default];
  }

  loadPerfil(): void {
    if (this.dni_actual != null && this.dni_actual != 0) {
      this.misDatosService.cargarPerfil().subscribe(
        d => {
          this.perfil = d;
          if (this.perfil.image_perfil?.length) {
            this.imagen_perfil = <String[]>this.perfil.image_perfil;
          }else
          {
            this.imagen_perfil =[image_face_default];
            // console.log('imagen por default')
          }
          // console.log("about images: ")
          // console.log( this.imagen_perfil);
          // //console.log(d);
        },
        e => {
          // console.log(" error about")
          this.imagen_perfil =[image_face_default];
          // console.log('imagen por default')
          //console.log(e);
          //throw e;
        },
        ()=>{
          this.cd.markForCheck();
        }

      )
    };

  }

  perfil: PerfilDTO = new PerfilDTO();
  images: String[] = []
  ngOnInit(): void {
    this.misDatosService.dni_actual.subscribe(
      d => {
        this.dni_actual = d;
        this.loadPerfil();
      }
    );
  }
}
