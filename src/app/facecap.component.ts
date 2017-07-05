import { 
  Component, 
  AfterViewChecked, 
  ViewChild, 
  ElementRef
} from '@angular/core';

//import * as od from 'js-objectdetect';
import * as od from 'js-objectdetect';
let gray: any = od.convertRgbaToGrayscale([1,2,1,1,1], []);
@Component({
  selector: 'facecap',
  templateUrl: './facecap.component.html',
  styleUrls: [ './facecap.component.css' ],
})
export class FacecapComponent implements AfterViewChecked { 

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  
  access: boolean = false;
  hasCanvasAndVideo = false;
  canvasElem: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  ngAfterViewInit(): void { }

  ngAfterViewChecked(): void { 
    if (this.hasCanvasAndVideo) {
      console.log(
        this.canvas,
        this.video
      );
      this.context = this.canvas.nativeElement.getContext('2d');
      this.hasCanvasAndVideo = false;
    }
  }

  getUserMedia(options, successCallback, failureCallback): any {
    /*let api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    */
    let api: Promise<MediaStream> = navigator.mediaDevices.getUserMedia(options);
    if (api) {
      //return api.bind(navigator)(options, successCallback, failureCallback);
      api.then(successCallback)
         .catch(failureCallback);
    } else {
      alert('User Media API not supported. Please update your browser');
    }
  }

  getStream(type): any {
    let constraints = {};
    constraints[type] = true;
    this.getUserMedia(constraints, (stream) => {
      this.hasCanvasAndVideo = true;
      this.access = true;
      let mediaControl = document.querySelector(type);
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL).createObjectURL(stream);
    },
    (err) => {
      alert(err.name);
      console.log(err.name, err.message);
    });
  }

  canvasToImage(): any {
    let canvasElem = this.canvas.nativeElement;
    let image = new Image();
    image.src = canvasElem.toDataURL('image/png');
    console.log('tried to capture image');
    return image; // not sure of the type to use for func sig
  }

}
