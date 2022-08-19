import {CONSTANTS} from './constants.js'
class ParkSlot {
    constructor(size, row, col, isAvailable) {
      this.size = size;
      this.row = row;
      this.col = col;
      this.isAvailable = isAvailable;
    }
  }

class Park {
    getMap(){
        return this.createMap();
    }
    createMap(){
        this.map = new Array(CONSTANTS.MAX_ROWS).fill("gateway").map( () => new Array(CONSTANTS.MAX_COLS).fill("gateway") )
        this.setSlot();
        return this.map;
    
    }
    isGateway ( row, col ) {
            if ( col == 0 || row == 0 || row == CONSTANTS.MAX_ROWS - 1 || col == CONSTANTS.MAX_COLS - 1 ) {
                return true
            } else { 
                return false
            }
        }
    setSlot(){
        for ( let i=0; i<CONSTANTS.MAX_ROWS; i++ ) {
            for ( let j=0; j<CONSTANTS.MAX_COLS; j++ ) {
                if ( !this.isGateway(i,j) ) {
                    this.map[i][j] = new ParkSlot (
                        this.getRandomSize(),
                        i,
                        j,
                        false
                    )
               }

           }
       }
   }
        getRandomSize() {
            const max = 2
            const min = 0
            const descriptors = ['SP', 'MP', 'LP']
            const size = Math.round(Math.random() * (max - min) + min)
            const desc = descriptors[size]
            return  {
                value: size,
                desc: desc
            }
        }
}

export class Parking {
    map=[];
    constructor () {
        this.setMap()
        // this.getMap()
    }
    setMap(){
        new Park();
        this.map = new Park().getMap();

    }
    getMap() {
        return this.map
    }
    park(size, ent) {
        let entrance = CONSTANTS.ENTRANCE.find(o => o.name === ent.toUpperCase() )
        let nrow = -1, ncol = -1
        let distance = 9999

        for ( let i=0; i<CONSTANTS.MAX_ROWS; i++ ) {
            for ( let j=0; j<CONSTANTS.MAX_COLS; j++ ) {
                if ( this.map[i][j] !== "gateway" ) {
                    let p = this.map[i][j]
                    if ( size <= p.size.value ) { 
                        let computedDistance = Math.abs( entrance.row + p.row ) + Math.abs ( entrance.col - p.col )
                        
                        if ( distance > computedDistance && !p.isAvailable ) {
                            distance = computedDistance
                            nrow = i
                            ncol = j
                        }
                    }
                }
            }
        }
        if ( nrow == -1 ) { 
            console.log ( 'No parking slot found' )
            return false
        } else {

            Object.assign( this.map[nrow][ncol], {
                isAvailable: true,
                row: nrow,
                col: ncol,
                start: new Date(),
                vehicle: this.getVehicleDesc(size)
            } )

            return this.map[nrow][ncol]
        }
    }
    getVehicleDesc(size) {

        switch ( parseInt(size) ) {
            case 0:
                return 'S'
                break
            case 1:
                return 'M'
                break
            case 2:
                return 'L'
                break
            default:
                return ''

        }

    }
    isGateway ( row, col ) {
        if ( col == 0 || row == 0 || row == this.MAX_ROWS - 1 || col == this.MAX_COLS - 1 ) {
            return true
        } else { 
            return false
        }
        }

    isValidSize(size) {
        if ( size >= 0 && size <= 2)
            return true
        else
            return false

    }

   
        
}
