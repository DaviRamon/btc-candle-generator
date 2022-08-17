import { runInThisContext } from "vm";
import CandleColor from "../enums/CandleColor";

export default class Candle {
     low: number;
     high: number;
     open: number;
     close: number;
     color: CandleColor;
     values: number[];
     currency: string;
     finalDateTime: Date;

     constructor(currency: string, initialDate: Date) {
          this.low = Infinity;
          this.high = 0;
          this.open = 0;
          this.close = 0;
          this.color = CandleColor.UNDETERMINED
          this.values = []
          this.currency = currency;
     }

     // adiciona os valors da candle

     addValue(value: number) {
          this.values.push(value);

          // valor de abertura.
          if (this.values.length == 1) {
               this.open = value;
          }

          // altera os valos mais baixos do dia
          if (this.low > value) {
               this.low = value;
          }

          // altera os valores mais altos do dia
          if (this.high < value) {
               this.high = value;
          }

     }


     // determina o preço de fechamento, a cor da candle e definir o horario de fechamento(finalDateTime)
     closeCandle() {

          // se houve valores ele fecha a candle
          if (this.values.length > 0) {
               this.close = this.values[this.values.length - 1];
               this.finalDateTime = new Date();

               // determina a cor da candle
               if (this.open > this.close) { // moeda desvalorizou
                    this.color = CandleColor.RED
               } else if (this.open < this.close) { // moeda valorizou
                    this.color = CandleColor.GREEN
               }
          }
     }


     /**
      * O values não pode ser passado na fila. Foi usado para controle interno da classe. 
      * Esse método cria um objeto que não inclui o Value para ser exportado e enviado na fila do RabbitMQ 
      */

     toSimpleObject() {
          const { values, ...obj} = this
          return obj
     }







}

