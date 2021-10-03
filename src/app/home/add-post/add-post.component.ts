import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  constructor(private modalControl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalControl.dismiss();
  }

}
