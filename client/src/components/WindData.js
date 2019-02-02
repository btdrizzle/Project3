export default {
    processWindData: async function(data) {
        console.log(data);
        function direction(direction) {
            console.log(direction);
            if((0 <= direction && direction <= 11.25) || (348.75 <= direction && direction <= 360)) {
                return "N";
            }else if(11.25 <= direction && direction <= 33.75) {
                return "NNE";
            }else if(33.75 <= direction && direction <= 56.25) {
                return "NE";
            }else if (56.25 <= direction && direction <= 78.75) {
                return "ENE";
            }else if (78.75 <= direction && direction <= 101.25) {
                return "E";
            }else if (101.25 <= direction && direction <= 123.75) {
                return "ESE";
            }else if(123.75 <= direction && direction <= 146.25) {
                return "SE";
            }else if (146.25 <= direction && direction <= 168.75) {
                return "SSE"
            }else if (168.75 <= direction && direction <= 191.25) {
                return "S";
            }else if (191.25 <= direction && direction <= 213.75){
                return "SSW";
            }else if (213.75 <= direction && direction <= 236.25) {
                return "SW";
            }else if (236.25 <= direction && direction <= 258.75) {
                return "WSW";
            }else if (258.75 <= direction && direction <= 281.25) {
                return "W";
            }else if (281.25 <= direction && direction <= 303.75){
                return "WNW";
            }else if (303.75 <= direction && direction <= 326.25) {
                return "NW";
            }else if (326.25 <= direction && direction <= 348.75){
                return "NNW";
            }
/*             switch(direction) {
                case (0 <= direction <= 11.25 || 348.75 <= direction <= 360):
                console.log("N");    
                return "N"
                case (11.25 <= direction <= 33.75):
                    return "NNE";
                case (33.75 <= direction <= 56.25):
                    return "NE";
                case (56.25 <= direction <= 78.75):
                    return "ENE";
                case (78.75 <= direction <= 101.25):
                    return "E";
                case (101.25 <= direction <= 123.75):
                    return "ESE";
                case (123.75 <= direction <= 146.25):
                    return "SE";
                case (146.25 <= direction <= 168.75):
                    return "SSE";
                case (168.75 <= direction <= 191.25):
                    return "S";
                case (191.25 <= direction <= 213.75):
                    return "SSW";
                case (213.75 <= direction <= 236.25):
                    return "SW";
                case (236.25 <= direction <= 258.75):
                    return "WSW";
                case (258.75 <= direction <= 281.25):
                    return "W";
                case (281.25 <= direction <= 303.75):
                    return "WNW";
                case (303.75 <= direction <= 326.25):
                    return "NW";
                case (326.25 <= direction <= 348.75):
                    return "NNW";
            } */
        }
        function speedClass(speed) {
            if(0 <= speed && speed <= 5) {
                return "A";
            }else if(5 <= speed && speed <= 10) {
                return "B";
            }else if(10 <= speed && speed <= 15) {
                return "C";
            }else {
                return "D";
            }
/*             switch(speed) {
                case (0 <= speed <= 5):
                console.log('A');    
                return "A";
                case (5 <= speed <= 10):
                    return "B"
                case (10 <= speed <= 15):
                    return "C";
                case (15 <= speed):
                    return "D";
            } */
            
        }
        let newArray = [];
        data.forEach(item => {
            let array = [direction(item.wind_average), speedClass(item.wind_speed)];
            newArray.push(array);
        });
        console.log(newArray);
        let dataStorage = {
            N:{A:0,B:0,C:0,D:0},
            NNE:{A:0,B:0,C:0,D:0},
            NE:{A:0,B:0,C:0,D:0},
            ENE:{A:0,B:0,C:0,D:0},
            E:{A:0,B:0,C:0,D:0},
            ESE:{A:0,B:0,C:0,D:0},
            SE:{A:0,B:0,C:0,D:0},
            SSE:{A:0,B:0,C:0,D:0},
            S:{A:0,B:0,C:0,D:0},
            SSW:{A:0,B:0,C:0,D:0},
            SW:{A:0,B:0,C:0,D:0},
            WSW:{A:0,B:0,C:0,D:0},
            W:{A:0,B:0,C:0,D:0},
            WNW:{A:0,B:0,C:0,D:0},
            NW:{A:0,B:0,C:0,D:0},
            NNW:{A:0,B:0,C:0,D:0}
        };

        newArray.forEach(tuple => {
            dataStorage[tuple[0]][tuple[1]]++
        });

        let finalDataStructure = [];

        for (let key in dataStorage) {
            finalDataStructure.push({
                wind_direction: key,
                ...dataStorage[key]
            })
        }
        console.log(finalDataStructure);
        return await finalDataStructure;
        
    }
  };

