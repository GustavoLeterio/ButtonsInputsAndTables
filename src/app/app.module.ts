import { StageListComponent } from './../Components/stage-list/stage-list.component';
import { TextareaComponent } from './../Components/textarea/textarea.component';
import { InfoBlockComponent } from './../Components/info-block/info-block.component';
import { TableComponent } from './../Components/table/table.component';
import { ProgressBarComponent } from './../Components/progress-bar/progress-bar.component';
import { SelectComponent } from './../Components/select/select.component';
import { InputComponent } from './../Components/input/input.component';
import { TitleComponent } from './../Components/title/title.component';
import { SidebarComponent } from './../Components/sidebar/sidebar.component';
import { ButtonComponent } from './../Components/button/button.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SidebarComponent,
    TitleComponent,
    TableComponent,
    InfoBlockComponent,
    StageListComponent,
    InputComponent,
    SelectComponent,
    ProgressBarComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot({}),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
