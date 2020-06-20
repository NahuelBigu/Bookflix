import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/books/book.service';
import { BookSampleComponent } from '../../books/book-sample/book-sample.component';
declare var $:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  books: Book[];
  constructor(private bookService: BookService) {
   


  }

  ngOnInit(): void {
    
    this.bookService.getActiveBooks()
    .subscribe(res => {
      
      this.books = res as Book[];
      this.arrancar();
    });
    
   

    
  }

  arrancar(){
    $(function(){
      var slider= $('#historial').lightSlider({
        item:5,
        loop:true,
        slideMove:2,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed:600,
        pause: 8000,
        responsive : [
            {
                breakpoint:1200,
                settings: {
                    item:4,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
              breakpoint:990,
              settings: {
                  item:3,
                  slideMove:1,
                  slideMargin:6,
                }
          },
            {
                breakpoint:768,
                settings: {
                    item:2,
                    slideMove:1
                  }
            },
            {
              breakpoint:440,
              settings: {
                  item:1,
                  slideMove:1
                }
          }
        ]
    });  
    slider.play(); 
    var slider= $('#favoritos').lightSlider({
      item:5,
      loop:true,
      slideMove:2,
      easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
      speed:600,
      pause: 8000,
      responsive : [
          {
              breakpoint:1200,
              settings: {
                  item:4,
                  slideMove:1,
                  slideMargin:6,
                }
          },
          {
            breakpoint:990,
            settings: {
                item:3,
                slideMove:1,
                slideMargin:6,
              }
        },
          {
              breakpoint:768,
              settings: {
                  item:2,
                  slideMove:1
                }
          },
          {
            breakpoint:440,
            settings: {
                item:1,
                slideMove:1
              }
        }
      ]
  });  
  slider.play(); 
  var slider= $('#libros').lightSlider({
    item:5,
    loop:true,
    slideMove:2,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed:600,
    pause: 8000,
    responsive : [
        {
            breakpoint:1200,
            settings: {
                item:4,
                slideMove:1,
                slideMargin:6,
              }
        },
        {
          breakpoint:990,
          settings: {
              item:3,
              slideMove:1,
              slideMargin:6,
            }
      },
        {
            breakpoint:768,
            settings: {
                item:2,
                slideMove:1
              }
        },
        {
          breakpoint:440,
          settings: {
              item:1,
              slideMove:1
            }
      }
    ]
});  
slider.play(); 
  });
  }


  
    

}
