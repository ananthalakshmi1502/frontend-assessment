import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent,AddContactDialog } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { EditContactDialog } from './material-dashboard/material-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,MatTooltipModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent,
    FilterPipe,
    AddContactDialog,
    EditContactDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
  	MatButtonModule,
  	MatDialogModule,
  	MatRadioModule,
  	MatFormFieldModule,
    LayoutModule,
    FormsModule

    
  ],
  exports: [ AddContactDialog,EditContactDialog ],
  entryComponents: [AddContactDialog,EditContactDialog],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
