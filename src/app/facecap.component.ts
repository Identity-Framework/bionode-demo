import { Component, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'facecap',
  templateUrl: './facecap.component.html',
  styleUrls: [ './facecap.component.css' ],
})
export class FacecapComponent implements AfterViewInit, AfterViewChecked { 

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
      alert('User Media API not supported.');
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

  canvasToImage(canvas: HTMLCanvasElement): any {
    let image = new Image();
    image.src = canvas.toDataURL('image/png');
    return image; // not sure of the type to use for func sig
  }
}
