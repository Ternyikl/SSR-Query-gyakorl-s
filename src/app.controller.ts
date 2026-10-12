import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('color-picker')
  @Render('color-picker')
  getColorPicker(
    @Query('txcolor') txcolor: string = 'black'
  ) {
    return {
      title: 'Color Picker',
      txcolor: txcolor
    }
  }

  qSolution(a: number, b: number, c: number): string {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return 'Nincs valós megoldás.';
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return `Egy valós megoldás: ${x}`;
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return `Két valós megoldás: ${x1}, ${x2}`;
    }
  }

  @Get('quadratic')
  @Render('quadratic')
  getQuadratic(
    @Query('a') a: string,
    @Query('b') b: string,
    @Query('c') c: string
  ) {
    return {
      title: 'Quadratic Formula',
      solution: this.qSolution(Number(a), Number(b), Number(c))
    }
  }

  getIntro(lang: string) {
      if(lang === "en")
      {
        return "Hi"
      }
      else
      {
        return "Szevasz"
      }
  }

  @Get('intro')
  @Render('intro')
  showIntro(
    @Query('lang') lang: string) {
    return {
      title: "Intro",
      intro: this.getIntro(lang)
    };
  }

  FullPrice(type: string, price: number): string{
    let fullprice: string = "";
    switch(type){
      case 'Food':
        fullprice = price.toString() + " Ft"
        break;
      case 'Book':
        fullprice = (price * 1.05).toString() + " Ft"
        break;
      case 'Elektronikai termék':
        fullprice = (price * 1.27).toString() + " Ft"
        break;
      default:
        fullprice = "Válaszon termék típust!";
        break;

    }
    return fullprice
  }

  @Get('afa')
  @Render('afa')
  showAfa(
    @Query('type') type: string,
    @Query('price') price: string
  ) {
    return{
      title: "Áfa felytés",
      price: price,
      fullprice: this.FullPrice(type,Number(price))
    }

  }
}
