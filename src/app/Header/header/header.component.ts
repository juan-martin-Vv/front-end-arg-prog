import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbCarouselConfig, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { image_banner_default, image_face_default, PerfilDTO } from 'src/app/Class/perfil-class';
import { EntradaTexto, ListaDlesplegable } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbCarouselConfig]
})
export class HeaderComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = false;


  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ImageBanner = [
    new ListaDlesplegable({
      key: 'banner',
      label: 'Imagenes del Banner',
    })
  ];
  ImageFace = [
    new ListaDlesplegable({
      key: 'face',
      label: 'Imagenes del Face'
    })
  ]
  BanerForm!: FormGroup;
  FaceForm!: FormGroup;
  isAdmin!: boolean;
  dni_actual!: number;
  perfil!: PerfilDTO;
  imagen_banner!: String[];
  imagen_face!: String[];
  constructor(config: NgbCarouselConfig,
    private miApi: InyectorDataService,
    private miAuth: TokenService,
    private modal: NgbModal,
    private formService: ControlService
  ) {
    this.perfil = new PerfilDTO();
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    this.imagen_face =[] //this.images = ['../../../assets/Homer-simpson.jpg'];
    this.imagen_banner = []//this.images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
    this.perfil.image_background_header=this.imagen_banner;
    this.perfil.image_perfil=this.imagen_face;
    this.getData();
    // this.images = [...this.images, '../../../assets/V4CQNELMTFE4DDFOY6SO2AATTE.jpg']
    // this.images = [...this.images, 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
  }

  ngOnInit(): void {
    this.miAuth.isAdminObs.subscribe(d => this.isAdmin = d)
    this.miApi.dni_actual.subscribe(d => {
      this.dni_actual = d;
      this.cargarPerfirl();
    });
  }
  cargarPerfirl(){
    this.miApi.cargarPerfil().subscribe(
      d => {
        this.perfil = d;
        if (this.perfil.image_perfil?.length) {
          this.imagen_face = <string[]>this.perfil.image_perfil;
        }
        if (this.perfil.image_background_header?.length) {
          this.imagen_banner = <string[]>this.perfil.image_background_header;
        }
        else
        {
          this.perfil.image_background_header=[image_banner_default];
        }
      },
      e => {
        this.getData();
      },
      () => {
        this.getData();
      }
    );

  }
  getData() {
    if (!this.imagen_face.length) {
      this.imagen_face.push(image_face_default);
    }
    if(!this.imagen_banner.length)
    {
      this.imagen_banner.push(image_banner_default);
    }
    this.formService.toArrayToFormList(this.ImageFace[0], this.imagen_face, 'face', 'Foto');
    this.FaceForm = this.formService.toFromGroup(this.ImageFace);
    this.formService.toArrayToFormList(this.ImageBanner[0], this.imagen_banner, 'imagen', 'Imagen');
    this.BanerForm = this.formService.toFromGroup(this.ImageBanner);
  }
  onEdit(conten: any) {
    this.modal.open(conten);
  }
  array_target!: String[];
  addImage(addImage: any, array_target: String[]) {
    this.modal.open(addImage);
    this.array_target = array_target;
  }
  imageTemp: String = '';
  addImages(image_array: String[]): String[] {
    image_array.push(this.imageTemp.toString());
    this.getData();
    this.array_target = [];
    this.imageTemp = '';
    return image_array;
  }
  deleteImage(image_array: String[],value:String): String[] {
    image_array.splice(image_array.indexOf(value), 1);
    this.getData();
    return image_array;
  }
  save() {
    // console.log('admin :'+this.isAdmin)
    if (this.isAdmin) {
      this.perfil.image_perfil = this.imagen_face;
      this.perfil.image_background_header = this.imagen_banner;
      console.log(this.perfil);
      this.miApi.editarrPerfil(this.perfil).subscribe(
        d => {
          this.perfil = d;
          // console.log('retorno :')
          // console.log(d);
        },
        e=>{

        },
        ()=>{
          this.cargarPerfirl();
          this.miApi.public_dni(this.dni_actual);
        }
      )
    }
  }
}
