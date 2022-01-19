import colors, {fixedColors} from './colors';

export function hslToRgb(h, s, l){
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//Get Shaded colors HSL
export function colorShadeGenerator(dataLen, index, fixedValue, convertToRGB) {
    let _light = null;
    let _color = null;
    let _index = index && index > -1 ? index : 0;
    if(fixedValue && fixedColors.indexOf(fixedValue) !== -1) {
        switch (fixedValue) {
            case 'Red':
                _color = '#901e3d';
                break;
            case 'Red - Sparkling':
                _color = '#EC6768';
                break;
            case 'White':
                _color = '#F5D588';
                break;
            case 'White - Sweet/Dessert':
                _color = '#fadaa5';
                break;
            case 'White - Sparkling':
                _color = '#E6E7BB';
                break;
            case 'expenses':
                _color = '#f36363';
                break;
            case 'income':
                _color = '#48c738';
                break;
            default:
                _color = '#4aa0a8';
                break;
        }
    } else {
        if(_index < colors.length){
            let _split = colors[_index].split(',');
            if(convertToRGB){
                let hsl = hslToRgb(parseFloat(_split[0])/360, parseFloat(_split[1])/360, parseFloat(_split[2])/360);
                _color = 'rgb('+hsl[0]+', '+hsl[1]+', '+hsl[2]+')';
            } else {
                _color = 'hsl('+_split[0]+', '+_split[1]+'%, '+_split[2]+'%)';
            }
        } else {
            let quotient = parseFloat(dataLen / colors.length);
            let remainder = parseFloat(_index % colors.length);
            let _split = colors[remainder].split(',');
            if(parseFloat(_split[2]) > 60){
                _light = parseFloat(_split[2]) - ((_split[2]) / quotient);
            } else {
                _light = parseFloat(_split[2]) + ((100 - _split[2]) / quotient);
            }
            if(convertToRGB){
                let hsl = hslToRgb(parseFloat(_split[0])/360, parseFloat(_split[1])/360, parseFloat(_split[2])/360);
                _color = 'rgb('+hsl[0]+', '+hsl[1]+', '+hsl[2]+')';
            } else {
                _color = 'hsl('+_split[0]+', '+_split[1]+'%, '+_light+'%)';
            }
        }
    }
    return _color
}