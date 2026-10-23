(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const el="180",Hh=0,Rl=1,Vh=2,Xc=1,qc=2,ti=3,Si=0,dn=1,sn=2,ni=0,vi=1,xn=2,Cl=3,Pl=4,Gh=5,Fi=100,Wh=101,Xh=102,qh=103,Yh=104,jh=200,Kh=201,Zh=202,$h=203,oo=204,lo=205,Jh=206,Qh=207,tu=208,eu=209,nu=210,iu=211,su=212,ru=213,au=214,co=0,ho=1,uo=2,xs=3,fo=4,po=5,mo=6,go=7,Yc=0,ou=1,lu=2,xi=0,jc=1,Kc=2,Zc=3,nl=4,$c=5,Jc=6,Qc=7,th=300,Ms=301,Ss=302,_o=303,vo=304,ha=306,yi=1e3,Oi=1001,xo=1002,yn=1003,cu=1004,gr=1005,Vn=1006,xa=1007,Bi=1008,qn=1009,eh=1010,nh=1011,tr=1012,il=1013,Hi=1014,Gn=1015,Xn=1016,sl=1017,rl=1018,er=1020,ih=35902,sh=35899,rh=1021,ah=1022,On=1023,nr=1026,ir=1027,al=1028,ol=1029,oh=1030,ll=1031,cl=1033,$r=33776,Jr=33777,Qr=33778,ta=33779,Mo=35840,So=35841,yo=35842,wo=35843,bo=36196,Eo=37492,To=37496,Ao=37808,Ro=37809,Co=37810,Po=37811,Io=37812,Do=37813,Lo=37814,Uo=37815,No=37816,Fo=37817,zo=37818,Oo=37819,Bo=37820,ko=37821,Ho=36492,Vo=36494,Go=36495,Wo=36283,Xo=36284,qo=36285,Yo=36286,hu=3200,uu=3201,lh=0,du=1,Rn="",qe="srgb",ys="srgb-linear",ia="linear",xe="srgb",Zi=7680,Il=519,fu=512,pu=513,mu=514,ch=515,gu=516,_u=517,vu=518,xu=519,jo=35044,Dl="300 es",Wn=2e3,sa=2001;class As{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ll=1234567;const $s=Math.PI/180,ws=180/Math.PI;function ii(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[s&255]+tn[s>>8&255]+tn[s>>16&255]+tn[s>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function oe(s,t,e){return Math.max(t,Math.min(e,s))}function hl(s,t){return(s%t+t)%t}function Mu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Su(s,t,e){return s!==t?(e-s)/(t-s):0}function Js(s,t,e){return(1-e)*s+e*t}function yu(s,t,e,n){return Js(s,t,1-Math.exp(-e*n))}function wu(s,t=1){return t-Math.abs(hl(s,t*2)-t)}function bu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Eu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Tu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Au(s,t){return s+Math.random()*(t-s)}function Ru(s){return s*(.5-Math.random())}function Cu(s){s!==void 0&&(Ll=s);let t=Ll+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Pu(s){return s*$s}function Iu(s){return s*ws}function Du(s){return(s&s-1)===0&&s!==0}function Lu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Uu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Nu(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),m=a((t-n)/2),u=r((n-t)/2),_=a((n-t)/2);switch(i){case"XYX":s.set(o*h,c*d,c*m,o*l);break;case"YZY":s.set(c*m,o*h,c*d,o*l);break;case"ZXZ":s.set(c*d,c*m,o*h,o*l);break;case"XZX":s.set(o*h,c*_,c*u,o*l);break;case"YXY":s.set(c*u,o*h,c*_,o*l);break;case"ZYZ":s.set(c*_,c*u,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function zn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Me(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Pe={DEG2RAD:$s,RAD2DEG:ws,generateUUID:ii,clamp:oe,euclideanModulo:hl,mapLinear:Mu,inverseLerp:Su,lerp:Js,damp:yu,pingpong:wu,smoothstep:bu,smootherstep:Eu,randInt:Tu,randFloat:Au,randFloatSpread:Ru,seededRandom:Cu,degToRad:Pu,radToDeg:Iu,isPowerOfTwo:Du,ceilPowerOfTwo:Lu,floorPowerOfTwo:Uu,setQuaternionFromProperEuler:Nu,normalize:Me,denormalize:zn};class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Rs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const m=r[a+0],u=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=m,t[e+1]=u,t[e+2]=_,t[e+3]=g;return}if(d!==g||c!==m||l!==u||h!==_){let f=1-o;const p=c*m+l*u+h*_+d*g,w=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const A=Math.sqrt(v),E=Math.atan2(A,p*w);f=Math.sin(f*E)/A,o=Math.sin(o*E)/A}const x=o*w;if(c=c*f+m*x,l=l*f+u*x,h=h*f+_*x,d=d*f+g*x,f===1-o){const A=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=A,l*=A,h*=A,d*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[a],m=r[a+1],u=r[a+2],_=r[a+3];return t[e]=o*_+h*d+c*u-l*m,t[e+1]=c*_+h*m+l*d-o*u,t[e+2]=l*_+h*u+o*m-c*d,t[e+3]=h*_-o*d-c*m-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(r/2),m=c(n/2),u=c(i/2),_=c(r/2);switch(a){case"XYZ":this._x=m*h*d+l*u*_,this._y=l*u*d-m*h*_,this._z=l*h*_+m*u*d,this._w=l*h*d-m*u*_;break;case"YXZ":this._x=m*h*d+l*u*_,this._y=l*u*d-m*h*_,this._z=l*h*_-m*u*d,this._w=l*h*d+m*u*_;break;case"ZXY":this._x=m*h*d-l*u*_,this._y=l*u*d+m*h*_,this._z=l*h*_+m*u*d,this._w=l*h*d-m*u*_;break;case"ZYX":this._x=m*h*d-l*u*_,this._y=l*u*d+m*h*_,this._z=l*h*_-m*u*d,this._w=l*h*d+m*u*_;break;case"YZX":this._x=m*h*d+l*u*_,this._y=l*u*d+m*h*_,this._z=l*h*_-m*u*d,this._w=l*h*d-m*u*_;break;case"XZY":this._x=m*h*d-l*u*_,this._y=l*u*d-m*h*_,this._z=l*h*_+m*u*d,this._w=l*h*d+m*u*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],m=n+o+d;if(m>0){const u=.5/Math.sqrt(m+1);this._w=.25/u,this._x=(h-c)*u,this._y=(r-l)*u,this._z=(a-i)*u}else if(n>o&&n>d){const u=2*Math.sqrt(1+n-o-d);this._w=(h-c)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+l)/u}else if(o>d){const u=2*Math.sqrt(1+o-n-d);this._w=(r-l)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(c+h)/u}else{const u=2*Math.sqrt(1+d-n-o);this._w=(a-i)/u,this._x=(r+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const u=1-e;return this._w=u*a+e*this._w,this._x=u*n+e*this._x,this._y=u*i+e*this._y,this._z=u*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-e)*h)/l,m=Math.sin(e*h)/l;return this._w=a*d+this._w*m,this._x=n*d+this._x*m,this._y=i*d+this._y*m,this._z=r*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ul.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ul.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=i+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ma.copy(this).projectOnVector(t),this.sub(Ma)}reflect(t){return this.sub(Ma.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ma=new T,Ul=new Rs;class se{constructor(t,e,n,i,r,a,o,c,l){se.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l)}set(t,e,n,i,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],m=n[2],u=n[5],_=n[8],g=i[0],f=i[3],p=i[6],w=i[1],v=i[4],x=i[7],A=i[2],E=i[5],C=i[8];return r[0]=a*g+o*w+c*A,r[3]=a*f+o*v+c*E,r[6]=a*p+o*x+c*C,r[1]=l*g+h*w+d*A,r[4]=l*f+h*v+d*E,r[7]=l*p+h*x+d*C,r[2]=m*g+u*w+_*A,r[5]=m*f+u*v+_*E,r[8]=m*p+u*x+_*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,m=o*c-h*r,u=l*r-a*c,_=e*d+n*m+i*u;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=d*g,t[1]=(i*l-h*n)*g,t[2]=(o*n-i*a)*g,t[3]=m*g,t[4]=(h*e-i*c)*g,t[5]=(i*r-o*e)*g,t[6]=u*g,t[7]=(n*c-l*e)*g,t[8]=(a*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Sa.makeScale(t,e)),this}rotate(t){return this.premultiply(Sa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Sa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Sa=new se;function hh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ra(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Fu(){const s=ra("canvas");return s.style.display="block",s}const Nl={};function sr(s){s in Nl||(Nl[s]=!0,console.warn(s))}function zu(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Fl=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ou(){const s={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xe&&(i.r=si(i.r),i.g=si(i.g),i.b=si(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xe&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Rn?ia:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return sr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return sr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ys]:{primaries:t,whitePoint:n,transfer:ia,toXYZ:Fl,fromXYZ:zl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:n,transfer:xe,toXYZ:Fl,fromXYZ:zl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),s}const de=Ou();function si(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function _s(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let $i;class Bu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$i===void 0&&($i=ra("canvas")),$i.width=t.width,$i.height=t.height;const i=$i.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=$i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ra("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ku=0;class ul{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=ii(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(ya(i[a].image)):r.push(ya(i[a]))}else r=ya(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function ya(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Bu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hu=0;const wa=new T;class rn extends As{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,n=Oi,i=Oi,r=Vn,a=Bi,o=On,c=qn,l=rn.DEFAULT_ANISOTROPY,h=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=ii(),this.name="",this.source=new ul(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wa).x}get height(){return this.source.getSize(wa).y}get depth(){return this.source.getSize(wa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yi:t.x=t.x-Math.floor(t.x);break;case Oi:t.x=t.x<0?0:1;break;case xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yi:t.y=t.y-Math.floor(t.y);break;case Oi:t.y=t.y<0?0:1;break;case xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=th;rn.DEFAULT_ANISOTROPY=1;class Re{constructor(t=0,e=0,n=0,i=1){Re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],d=c[8],m=c[1],u=c[5],_=c[9],g=c[2],f=c[6],p=c[10];if(Math.abs(h-m)<.01&&Math.abs(d-g)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+m)<.1&&Math.abs(d+g)<.1&&Math.abs(_+f)<.1&&Math.abs(l+u+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,x=(u+1)/2,A=(p+1)/2,E=(h+m)/4,C=(d+g)/4,I=(_+f)/4;return v>x&&v>A?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=E/n,r=C/n):x>A?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=E/i,r=I/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=C/r,i=I/r),this.set(n,i,r,e),this}let w=Math.sqrt((f-_)*(f-_)+(d-g)*(d-g)+(m-h)*(m-h));return Math.abs(w)<.001&&(w=1),this.x=(f-_)/w,this.y=(d-g)/w,this.z=(m-h)/w,this.w=Math.acos((l+u+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vu extends As{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new rn(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new ul(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends Vu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class uh extends rn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gu extends rn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gi{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_r.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_r.copy(n.boundingBox)),_r.applyMatrix4(t.matrixWorld),this.union(_r)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zs),vr.subVectors(this.max,zs),Ji.subVectors(t.a,zs),Qi.subVectors(t.b,zs),ts.subVectors(t.c,zs),ci.subVectors(Qi,Ji),hi.subVectors(ts,Qi),Ri.subVectors(Ji,ts);let e=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Ri.z,Ri.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Ri.z,0,-Ri.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Ri.y,Ri.x,0];return!ba(e,Ji,Qi,ts,vr)||(e=[1,0,0,0,1,0,0,0,1],!ba(e,Ji,Qi,ts,vr))?!1:(xr.crossVectors(ci,hi),e=[xr.x,xr.y,xr.z],ba(e,Ji,Qi,ts,vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Kn=[new T,new T,new T,new T,new T,new T,new T,new T],Ln=new T,_r=new Gi,Ji=new T,Qi=new T,ts=new T,ci=new T,hi=new T,Ri=new T,zs=new T,vr=new T,xr=new T,Ci=new T;function ba(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ci.fromArray(s,r);const o=i.x*Math.abs(Ci.x)+i.y*Math.abs(Ci.y)+i.z*Math.abs(Ci.z),c=t.dot(Ci),l=e.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Wu=new Gi,Os=new T,Ea=new T;class Wi{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Wu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Os.subVectors(t,this.center);const e=Os.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Os,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Os.copy(t.center).add(Ea)),this.expandByPoint(Os.copy(t.center).sub(Ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Zn=new T,Ta=new T,Mr=new T,ui=new T,Aa=new T,Sr=new T,Ra=new T;class ua{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ta.copy(t).add(e).multiplyScalar(.5),Mr.copy(e).sub(t).normalize(),ui.copy(this.origin).sub(Ta);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Mr),o=ui.dot(this.direction),c=-ui.dot(Mr),l=ui.lengthSq(),h=Math.abs(1-a*a);let d,m,u,_;if(h>0)if(d=a*c-o,m=a*o-c,_=r*h,d>=0)if(m>=-_)if(m<=_){const g=1/h;d*=g,m*=g,u=d*(d+a*m+2*o)+m*(a*d+m+2*c)+l}else m=r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*c)+l;else m=-r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*c)+l;else m<=-_?(d=Math.max(0,-(-a*r+o)),m=d>0?-r:Math.min(Math.max(-r,-c),r),u=-d*d+m*(m+2*c)+l):m<=_?(d=0,m=Math.min(Math.max(-r,-c),r),u=m*(m+2*c)+l):(d=Math.max(0,-(a*r+o)),m=d>0?r:Math.min(Math.max(-r,-c),r),u=-d*d+m*(m+2*c)+l);else m=a>0?-r:r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ta).addScaledVector(Mr,m),u}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,m=this.origin;return l>=0?(n=(t.min.x-m.x)*l,i=(t.max.x-m.x)*l):(n=(t.max.x-m.x)*l,i=(t.min.x-m.x)*l),h>=0?(r=(t.min.y-m.y)*h,a=(t.max.y-m.y)*h):(r=(t.max.y-m.y)*h,a=(t.min.y-m.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-m.z)*d,c=(t.max.z-m.z)*d):(o=(t.max.z-m.z)*d,c=(t.min.z-m.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,i,r){Aa.subVectors(e,t),Sr.subVectors(n,t),Ra.crossVectors(Aa,Sr);let a=this.direction.dot(Ra),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ui.subVectors(this.origin,t);const c=o*this.direction.dot(Sr.crossVectors(ui,Sr));if(c<0)return null;const l=o*this.direction.dot(Aa.cross(ui));if(l<0||c+l>a)return null;const h=-o*ui.dot(Ra);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,n,i,r,a,o,c,l,h,d,m,u,_,g,f){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l,h,d,m,u,_,g,f)}set(t,e,n,i,r,a,o,c,l,h,d,m,u,_,g,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=m,p[3]=u,p[7]=_,p[11]=g,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),a=1/es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const m=a*h,u=a*d,_=o*h,g=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=u+_*l,e[5]=m-g*l,e[9]=-o*c,e[2]=g-m*l,e[6]=_+u*l,e[10]=a*c}else if(t.order==="YXZ"){const m=c*h,u=c*d,_=l*h,g=l*d;e[0]=m+g*o,e[4]=_*o-u,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-_,e[6]=g+m*o,e[10]=a*c}else if(t.order==="ZXY"){const m=c*h,u=c*d,_=l*h,g=l*d;e[0]=m-g*o,e[4]=-a*d,e[8]=_+u*o,e[1]=u+_*o,e[5]=a*h,e[9]=g-m*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const m=a*h,u=a*d,_=o*h,g=o*d;e[0]=c*h,e[4]=_*l-u,e[8]=m*l+g,e[1]=c*d,e[5]=g*l+m,e[9]=u*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const m=a*c,u=a*l,_=o*c,g=o*l;e[0]=c*h,e[4]=g-m*d,e[8]=_*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=u*d+_,e[10]=m-g*d}else if(t.order==="XZY"){const m=a*c,u=a*l,_=o*c,g=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=m*d+g,e[5]=a*h,e[9]=u*d-_,e[2]=_*d-u,e[6]=o*h,e[10]=g*d+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xu,t,qu)}lookAt(t,e,n){const i=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),di.crossVectors(n,_n),di.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),di.crossVectors(n,_n)),di.normalize(),yr.crossVectors(_n,di),i[0]=di.x,i[4]=yr.x,i[8]=_n.x,i[1]=di.y,i[5]=yr.y,i[9]=_n.y,i[2]=di.z,i[6]=yr.z,i[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],m=n[9],u=n[13],_=n[2],g=n[6],f=n[10],p=n[14],w=n[3],v=n[7],x=n[11],A=n[15],E=i[0],C=i[4],I=i[8],y=i[12],S=i[1],D=i[5],N=i[9],k=i[13],K=i[2],B=i[6],Y=i[10],nt=i[14],W=i[3],ut=i[7],j=i[11],gt=i[15];return r[0]=a*E+o*S+c*K+l*W,r[4]=a*C+o*D+c*B+l*ut,r[8]=a*I+o*N+c*Y+l*j,r[12]=a*y+o*k+c*nt+l*gt,r[1]=h*E+d*S+m*K+u*W,r[5]=h*C+d*D+m*B+u*ut,r[9]=h*I+d*N+m*Y+u*j,r[13]=h*y+d*k+m*nt+u*gt,r[2]=_*E+g*S+f*K+p*W,r[6]=_*C+g*D+f*B+p*ut,r[10]=_*I+g*N+f*Y+p*j,r[14]=_*y+g*k+f*nt+p*gt,r[3]=w*E+v*S+x*K+A*W,r[7]=w*C+v*D+x*B+A*ut,r[11]=w*I+v*N+x*Y+A*j,r[15]=w*y+v*k+x*nt+A*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],m=t[10],u=t[14],_=t[3],g=t[7],f=t[11],p=t[15];return _*(+r*c*d-i*l*d-r*o*m+n*l*m+i*o*u-n*c*u)+g*(+e*c*u-e*l*m+r*a*m-i*a*u+i*l*h-r*c*h)+f*(+e*l*d-e*o*u-r*a*d+n*a*u+r*o*h-n*l*h)+p*(-i*o*h-e*c*d+e*o*m+i*a*d-n*a*m+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],m=t[10],u=t[11],_=t[12],g=t[13],f=t[14],p=t[15],w=d*f*l-g*m*l+g*c*u-o*f*u-d*c*p+o*m*p,v=_*m*l-h*f*l-_*c*u+a*f*u+h*c*p-a*m*p,x=h*g*l-_*d*l+_*o*u-a*g*u-h*o*p+a*d*p,A=_*d*c-h*g*c-_*o*m+a*g*m+h*o*f-a*d*f,E=e*w+n*v+i*x+r*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=w*C,t[1]=(g*m*r-d*f*r-g*i*u+n*f*u+d*i*p-n*m*p)*C,t[2]=(o*f*r-g*c*r+g*i*l-n*f*l-o*i*p+n*c*p)*C,t[3]=(d*c*r-o*m*r-d*i*l+n*m*l+o*i*u-n*c*u)*C,t[4]=v*C,t[5]=(h*f*r-_*m*r+_*i*u-e*f*u-h*i*p+e*m*p)*C,t[6]=(_*c*r-a*f*r-_*i*l+e*f*l+a*i*p-e*c*p)*C,t[7]=(a*m*r-h*c*r+h*i*l-e*m*l-a*i*u+e*c*u)*C,t[8]=x*C,t[9]=(_*d*r-h*g*r-_*n*u+e*g*u+h*n*p-e*d*p)*C,t[10]=(a*g*r-_*o*r+_*n*l-e*g*l-a*n*p+e*o*p)*C,t[11]=(h*o*r-a*d*r-h*n*l+e*d*l+a*n*u-e*o*u)*C,t[12]=A*C,t[13]=(h*g*i-_*d*i+_*n*m-e*g*m-h*n*f+e*d*f)*C,t[14]=(_*o*i-a*g*i-_*n*c+e*g*c+a*n*f-e*o*f)*C,t[15]=(a*d*i-h*o*i+h*n*c-e*d*c-a*n*m+e*o*m)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,m=r*l,u=r*h,_=r*d,g=a*h,f=a*d,p=o*d,w=c*l,v=c*h,x=c*d,A=n.x,E=n.y,C=n.z;return i[0]=(1-(g+p))*A,i[1]=(u+x)*A,i[2]=(_-v)*A,i[3]=0,i[4]=(u-x)*E,i[5]=(1-(m+p))*E,i[6]=(f+w)*E,i[7]=0,i[8]=(_+v)*C,i[9]=(f-w)*C,i[10]=(1-(m+g))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=es.set(i[0],i[1],i[2]).length();const a=es.set(i[4],i[5],i[6]).length(),o=es.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Un.copy(this);const l=1/r,h=1/a,d=1/o;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,e.setFromRotationMatrix(Un),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Wn,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-i),m=(e+t)/(e-t),u=(n+i)/(n-i);let _,g;if(c)_=r/(a-r),g=a*r/(a-r);else if(o===Wn)_=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===sa)_=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=m,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Wn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-i),m=-(e+t)/(e-t),u=-(n+i)/(n-i);let _,g;if(c)_=1/(a-r),g=a/(a-r);else if(o===Wn)_=-2/(a-r),g=-(a+r)/(a-r);else if(o===sa)_=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=m,l[1]=0,l[5]=d,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const es=new T,Un=new me,Xu=new T(0,0,0),qu=new T(1,1,1),di=new T,yr=new T,_n=new T,Ol=new me,Bl=new Rs;class Bn{constructor(t=0,e=0,n=0,i=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],m=i[6],u=i[10];switch(e){case"XYZ":this._y=Math.asin(oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(m,u),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ol,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";class dl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yu=0;const kl=new T,ns=new Rs,$n=new me,wr=new T,Bs=new T,ju=new T,Ku=new Rs,Hl=new T(1,0,0),Vl=new T(0,1,0),Gl=new T(0,0,1),Wl={type:"added"},Zu={type:"removed"},is={type:"childadded",child:null},Ca={type:"childremoved",child:null};class Ue extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ue.DEFAULT_UP.clone();const t=new T,e=new Bn,n=new Rs,i=new T(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new me},normalMatrix:{value:new se}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Ue.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(Hl,t)}rotateY(t){return this.rotateOnAxis(Vl,t)}rotateZ(t){return this.rotateOnAxis(Gl,t)}translateOnAxis(t,e){return kl.copy(t).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hl,t)}translateY(t){return this.translateOnAxis(Vl,t)}translateZ(t){return this.translateOnAxis(Gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wr.copy(t):wr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Bs,wr,this.up):$n.lookAt(wr,Bs,this.up),this.quaternion.setFromRotationMatrix($n),i&&($n.extractRotation(i.matrixWorld),ns.setFromRotationMatrix($n),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wl),is.child=t,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zu),Ca.child=t,this.dispatchEvent(Ca),Ca.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wl),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,ju),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,Ku,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),m=a(t.skeletons),u=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),m.length>0&&(n.skeletons=m),u.length>0&&(n.animations=u),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ue.DEFAULT_UP=new T(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new T,Jn=new T,Pa=new T,Qn=new T,ss=new T,rs=new T,Xl=new T,Ia=new T,Da=new T,La=new T,Ua=new Re,Na=new Re,Fa=new Re;class Cn{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Nn.subVectors(t,e),i.cross(Nn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Nn.subVectors(i,e),Jn.subVectors(n,e),Pa.subVectors(t,e);const a=Nn.dot(Nn),o=Nn.dot(Jn),c=Nn.dot(Pa),l=Jn.dot(Jn),h=Jn.dot(Pa),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const m=1/d,u=(l*c-o*h)*m,_=(a*h-o*c)*m;return r.set(1-u-_,_,u)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qn.x),c.addScaledVector(a,Qn.y),c.addScaledVector(o,Qn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,a){return Ua.setScalar(0),Na.setScalar(0),Fa.setScalar(0),Ua.fromBufferAttribute(t,e),Na.fromBufferAttribute(t,n),Fa.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Ua,r.x),a.addScaledVector(Na,r.y),a.addScaledVector(Fa,r.z),a}static isFrontFacing(t,e,n,i){return Nn.subVectors(n,e),Jn.subVectors(t,e),Nn.cross(Jn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Nn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Nn.cross(Jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Cn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;ss.subVectors(i,n),rs.subVectors(r,n),Ia.subVectors(t,n);const c=ss.dot(Ia),l=rs.dot(Ia);if(c<=0&&l<=0)return e.copy(n);Da.subVectors(t,i);const h=ss.dot(Da),d=rs.dot(Da);if(h>=0&&d<=h)return e.copy(i);const m=c*d-h*l;if(m<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ss,a);La.subVectors(t,r);const u=ss.dot(La),_=rs.dot(La);if(_>=0&&u<=_)return e.copy(r);const g=u*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(rs,o);const f=h*_-u*d;if(f<=0&&d-h>=0&&u-_>=0)return Xl.subVectors(r,i),o=(d-h)/(d-h+(u-_)),e.copy(i).addScaledVector(Xl,o);const p=1/(f+g+m);return a=g*p,o=m*p,e.copy(n).addScaledVector(ss,a).addScaledVector(rs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},br={h:0,s:0,l:0};function za(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=hl(t,1),e=oe(e,0,1),n=oe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=za(a,r,t+1/3),this.g=za(a,r,t),this.b=za(a,r,t-1/3)}return de.colorSpaceToWorking(this,i),this}setStyle(t,e=qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const n=dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return de.workingToColorSpace(en.copy(this),t),Math.round(oe(en.r*255,0,255))*65536+Math.round(oe(en.g*255,0,255))*256+Math.round(oe(en.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(en.copy(this),e);const n=en.r,i=en.g,r=en.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=qe){de.workingToColorSpace(en.copy(this),t);const e=en.r,n=en.g,i=en.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(fi),this.setHSL(fi.h+t,fi.s+e,fi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fi),t.getHSL(br);const n=Js(fi.h,br.h,e),i=Js(fi.s,br.s,e),r=Js(fi.l,br.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new ee;ee.NAMES=dh;let $u=0;class bi extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=ii(),this.name="",this.type="Material",this.blending=vi,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=lo,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==lo&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Mi extends bi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xe=new T,Er=new Rt;let Ju=0;class Je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ju++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jo,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=zn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),i=Me(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),i=Me(i,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jo&&(t.usage=this.usage),t}}class fh extends Je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ph extends Je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class be extends Je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Qu=0;const En=new me,Oa=new Ue,as=new T,vn=new Gi,ks=new Gi,Ze=new T;class He extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hh(t)?ph:fh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new se().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,n){return En.makeTranslation(t,e,n),this.applyMatrix4(En),this}scale(t,e,n){return En.makeScale(t,e,n),this.applyMatrix4(En),this}lookAt(t){return Oa.lookAt(t),Oa.updateMatrix(),this.applyMatrix4(Oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new be(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(vn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(vn.min,ks.min),vn.expandByPoint(Ze),Ze.addVectors(vn.max,ks.max),vn.expandByPoint(Ze)):(vn.expandByPoint(ks.min),vn.expandByPoint(ks.max))}vn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ze.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ze));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ze.fromBufferAttribute(o,l),c&&(as.fromBufferAttribute(t,l),Ze.add(as)),i=Math.max(i,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new T,c[I]=new T;const l=new T,h=new T,d=new T,m=new Rt,u=new Rt,_=new Rt,g=new T,f=new T;function p(I,y,S){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,S),m.fromBufferAttribute(r,I),u.fromBufferAttribute(r,y),_.fromBufferAttribute(r,S),h.sub(l),d.sub(l),u.sub(m),_.sub(m);const D=1/(u.x*_.y-_.x*u.y);isFinite(D)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(d,-u.y).multiplyScalar(D),f.copy(d).multiplyScalar(u.x).addScaledVector(h,-_.x).multiplyScalar(D),o[I].add(g),o[y].add(g),o[S].add(g),c[I].add(f),c[y].add(f),c[S].add(f))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let I=0,y=w.length;I<y;++I){const S=w[I],D=S.start,N=S.count;for(let k=D,K=D+N;k<K;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new T,x=new T,A=new T,E=new T;function C(I){A.fromBufferAttribute(i,I),E.copy(A);const y=o[I];v.copy(y),v.sub(A.multiplyScalar(A.dot(y))).normalize(),x.crossVectors(E,y);const D=x.dot(c[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,D)}for(let I=0,y=w.length;I<y;++I){const S=w[I],D=S.start,N=S.count;for(let k=D,K=D+N;k<K;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,u=n.count;m<u;m++)n.setXYZ(m,0,0,0);const i=new T,r=new T,a=new T,o=new T,c=new T,l=new T,h=new T,d=new T;if(t)for(let m=0,u=t.count;m<u;m+=3){const _=t.getX(m+0),g=t.getX(m+1),f=t.getX(m+2);i.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,f),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let m=0,u=e.count;m<u;m+=3)i.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),a.fromBufferAttribute(e,m+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,m=new l.constructor(c.length*h);let u=0,_=0;for(let g=0,f=c.length;g<f;g++){o.isInterleavedBufferAttribute?u=c[g]*o.data.stride+o.offset:u=c[g]*h;for(let p=0;p<h;p++)m[_++]=l[u++]}return new Je(m,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const m=l[h],u=t(m,n);c.push(u)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,m=l.length;d<m;d++){const u=l[d];h.push(u.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let m=0,u=d.length;m<u;m++)h.push(d[m].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ql=new me,Pi=new ua,Tr=new Wi,Yl=new T,Ar=new T,Rr=new T,Cr=new T,Ba=new T,Pr=new T,jl=new T,Ir=new T;class dt extends Ue{constructor(t=new He,e=new Mi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Pr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Ba.fromBufferAttribute(d,t),a?Pr.addScaledVector(Ba,h):Pr.addScaledVector(Ba.sub(e),h))}e.add(Pr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(Tr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Tr,Yl)===null||Pi.origin.distanceToSquared(Yl)>(t.far-t.near)**2))&&(ql.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(ql),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,m=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=m.length;_<g;_++){const f=m[_],p=a[f.materialIndex],w=Math.max(f.start,u.start),v=Math.min(o.count,Math.min(f.start+f.count,u.start+u.count));for(let x=w,A=v;x<A;x+=3){const E=o.getX(x),C=o.getX(x+1),I=o.getX(x+2);i=Dr(this,p,t,n,l,h,d,E,C,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{const _=Math.max(0,u.start),g=Math.min(o.count,u.start+u.count);for(let f=_,p=g;f<p;f+=3){const w=o.getX(f),v=o.getX(f+1),x=o.getX(f+2);i=Dr(this,a,t,n,l,h,d,w,v,x),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=m.length;_<g;_++){const f=m[_],p=a[f.materialIndex],w=Math.max(f.start,u.start),v=Math.min(c.count,Math.min(f.start+f.count,u.start+u.count));for(let x=w,A=v;x<A;x+=3){const E=x,C=x+1,I=x+2;i=Dr(this,p,t,n,l,h,d,E,C,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{const _=Math.max(0,u.start),g=Math.min(c.count,u.start+u.count);for(let f=_,p=g;f<p;f+=3){const w=f,v=f+1,x=f+2;i=Dr(this,a,t,n,l,h,d,w,v,x),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}}}function td(s,t,e,n,i,r,a,o){let c;if(t.side===dn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===Si,o),c===null)return null;Ir.copy(o),Ir.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ir);return l<e.near||l>e.far?null:{distance:l,point:Ir.clone(),object:s}}function Dr(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,Ar),s.getVertexPosition(c,Rr),s.getVertexPosition(l,Cr);const h=td(s,t,e,n,Ar,Rr,Cr,jl);if(h){const d=new T;Cn.getBarycoord(jl,Ar,Rr,Cr,d),i&&(h.uv=Cn.getInterpolatedAttribute(i,o,c,l,d,new Rt)),r&&(h.uv1=Cn.getInterpolatedAttribute(r,o,c,l,d,new Rt)),a&&(h.normal=Cn.getInterpolatedAttribute(a,o,c,l,d,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const m={a:o,b:c,c:l,normal:new T,materialIndex:0};Cn.getNormal(Ar,Rr,Cr,m.normal),h.face=m,h.barycoord=d}return h}class yt extends He{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let m=0,u=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,i,a,2),_("x","z","y",1,-1,t,n,-e,i,a,3),_("x","y","z",1,-1,t,e,n,i,r,4),_("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new be(l,3)),this.setAttribute("normal",new be(h,3)),this.setAttribute("uv",new be(d,2));function _(g,f,p,w,v,x,A,E,C,I,y){const S=x/C,D=A/I,N=x/2,k=A/2,K=E/2,B=C+1,Y=I+1;let nt=0,W=0;const ut=new T;for(let j=0;j<Y;j++){const gt=j*D-k;for(let It=0;It<B;It++){const jt=It*S-N;ut[g]=jt*w,ut[f]=gt*v,ut[p]=K,l.push(ut.x,ut.y,ut.z),ut[g]=0,ut[f]=0,ut[p]=E>0?1:-1,h.push(ut.x,ut.y,ut.z),d.push(It/C),d.push(1-j/I),nt+=1}}for(let j=0;j<I;j++)for(let gt=0;gt<C;gt++){const It=m+gt+B*j,jt=m+gt+B*(j+1),re=m+(gt+1)+B*(j+1),$t=m+(gt+1)+B*j;c.push(It,jt,$t),c.push(jt,re,$t),W+=6}o.addGroup(u,W,y),u+=W,m+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function hn(s){const t={};for(let e=0;e<s.length;e++){const n=bs(s[e]);for(const i in n)t[i]=n[i]}return t}function ed(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function mh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const rr={clone:bs,merge:hn};var nd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,id=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qe extends bi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nd,this.fragmentShader=id,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=ed(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class gh extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pi=new T,Kl=new Rt,Zl=new Rt;class un extends gh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,Kl,Zl),e.subVectors(Zl,Kl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($s*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const os=-90,ls=1;class sd extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new un(os,ls,t,e);i.layers=this.layers,this.add(i);const r=new un(os,ls,t,e);r.layers=this.layers,this.add(r);const a=new un(os,ls,t,e);a.layers=this.layers,this.add(a);const o=new un(os,ls,t,e);o.layers=this.layers,this.add(o);const c=new un(os,ls,t,e);c.layers=this.layers,this.add(c);const l=new un(os,ls,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===sa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),m=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,m,u),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class _h extends rn{constructor(t=[],e=Ms,n,i,r,a,o,c,l,h){super(t,e,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class rd extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new _h(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new yt(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:ni});r.uniforms.tEquirect.value=e;const a=new dt(i,r),o=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Vn),new sd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class Oe extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ad={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const f=e.getJointPose(g,n),p=this._getHandJoint(l,g);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],m=h.position.distanceTo(d.position),u=.02,_=.005;l.inputState.pinching&&m>u+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&m<=u-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ad)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class fl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new fl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ko extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class od{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jo,this.updateRanges=[],this.version=0,this.uuid=ii()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const cn=new T;class aa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)cn.fromBufferAttribute(this,e),cn.applyMatrix4(t),this.setXYZ(e,cn.x,cn.y,cn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)cn.fromBufferAttribute(this,e),cn.applyNormalMatrix(t),this.setXYZ(e,cn.x,cn.y,cn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)cn.fromBufferAttribute(this,e),cn.transformDirection(t),this.setXYZ(e,cn.x,cn.y,cn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=zn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=zn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=zn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=zn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=zn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),i=Me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),i=Me(i,this.array),r=Me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new aa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ei extends bi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let cs;const Hs=new T,hs=new T,us=new T,ds=new Rt,Vs=new Rt,vh=new me,Lr=new T,Gs=new T,Ur=new T,$l=new Rt,Ha=new Rt,Jl=new Rt;class mi extends Ue{constructor(t=new ei){if(super(),this.isSprite=!0,this.type="Sprite",cs===void 0){cs=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new od(e,5);cs.setIndex([0,1,2,0,2,3]),cs.setAttribute("position",new aa(n,3,0,!1)),cs.setAttribute("uv",new aa(n,2,3,!1))}this.geometry=cs,this.material=t,this.center=new Rt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hs.setFromMatrixScale(this.matrixWorld),vh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),us.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hs.multiplyScalar(-us.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Nr(Lr.set(-.5,-.5,0),us,a,hs,i,r),Nr(Gs.set(.5,-.5,0),us,a,hs,i,r),Nr(Ur.set(.5,.5,0),us,a,hs,i,r),$l.set(0,0),Ha.set(1,0),Jl.set(1,1);let o=t.ray.intersectTriangle(Lr,Gs,Ur,!1,Hs);if(o===null&&(Nr(Gs.set(-.5,.5,0),us,a,hs,i,r),Ha.set(0,1),o=t.ray.intersectTriangle(Lr,Ur,Gs,!1,Hs),o===null))return;const c=t.ray.origin.distanceTo(Hs);c<t.near||c>t.far||e.push({distance:c,point:Hs.clone(),uv:Cn.getInterpolation(Hs,Lr,Gs,Ur,$l,Ha,Jl,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Nr(s,t,e,n,i,r){ds.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Vs.x=r*ds.x-i*ds.y,Vs.y=i*ds.x+r*ds.y):Vs.copy(ds),s.copy(t),s.x+=Vs.x,s.y+=Vs.y,s.applyMatrix4(vh)}class ld extends rn{constructor(t=null,e=1,n=1,i,r,a,o,c,l=yn,h=yn,d,m){super(null,a,o,c,l,h,i,r,d,m),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ql extends Je{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const fs=new me,tc=new me,Fr=[],ec=new Gi,cd=new me,Ws=new dt,Xs=new Wi;class zr extends dt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ql(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,cd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Gi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),ec.copy(t.boundingBox).applyMatrix4(fs),this.boundingBox.union(ec)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),Xs.copy(t.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(Xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xs.copy(this.boundingSphere),Xs.applyMatrix4(n),t.ray.intersectsSphere(Xs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,fs),tc.multiplyMatrices(n,fs),Ws.matrixWorld=tc,Ws.raycast(t,Fr);for(let a=0,o=Fr.length;a<o;a++){const c=Fr[a];c.instanceId=r,c.object=this,e.push(c)}Fr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ql(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ld(new Float32Array(i*this.count),i,this.count,al,Gn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Va=new T,hd=new T,ud=new se;class Ui{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Va.subVectors(n,e).cross(hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Va),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ud.getNormalMatrix(t),i=this.coplanarPoint(Va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new Wi,dd=new Rt(.5,.5),Or=new T;class pl{constructor(t=new Ui,e=new Ui,n=new Ui,i=new Ui,r=new Ui,a=new Ui){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],m=r[6],u=r[7],_=r[8],g=r[9],f=r[10],p=r[11],w=r[12],v=r[13],x=r[14],A=r[15];if(i[0].setComponents(l-a,u-h,p-_,A-w).normalize(),i[1].setComponents(l+a,u+h,p+_,A+w).normalize(),i[2].setComponents(l+o,u+d,p+g,A+v).normalize(),i[3].setComponents(l-o,u-d,p-g,A-v).normalize(),n)i[4].setComponents(c,m,f,x).normalize(),i[5].setComponents(l-c,u-m,p-f,A-x).normalize();else if(i[4].setComponents(l-c,u-m,p-f,A-x).normalize(),e===Wn)i[5].setComponents(l+c,u+m,p+f,A+x).normalize();else if(e===sa)i[5].setComponents(c,m,f,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(t){Ii.center.set(0,0,0);const e=dd.distanceTo(t.center);return Ii.radius=.7071067811865476+e,Ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Or.x=i.normal.x>0?t.max.x:t.min.x,Or.y=i.normal.y>0?t.max.y:t.min.y,Or.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Or)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xh extends bi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oa=new T,la=new T,nc=new me,qs=new ua,Br=new Wi,Ga=new T,ic=new T;class fd extends Ue{constructor(t=new He,e=new xh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)oa.fromBufferAttribute(e,i-1),la.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=oa.distanceTo(la);t.setAttribute("lineDistance",new be(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;nc.copy(i).invert(),qs.copy(t.ray).applyMatrix4(nc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,m=n.attributes.position;if(h!==null){const u=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let g=u,f=_-1;g<f;g+=l){const p=h.getX(g),w=h.getX(g+1),v=kr(this,t,qs,c,p,w,g);v&&e.push(v)}if(this.isLineLoop){const g=h.getX(_-1),f=h.getX(u),p=kr(this,t,qs,c,g,f,_-1);p&&e.push(p)}}else{const u=Math.max(0,a.start),_=Math.min(m.count,a.start+a.count);for(let g=u,f=_-1;g<f;g+=l){const p=kr(this,t,qs,c,g,g+1,g);p&&e.push(p)}if(this.isLineLoop){const g=kr(this,t,qs,c,_-1,u,_-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function kr(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(oa.fromBufferAttribute(o,i),la.fromBufferAttribute(o,r),e.distanceSqToSegment(oa,la,Ga,ic)>n)return;Ga.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Ga);if(!(l<t.near||l>t.far))return{distance:l,point:ic.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}class Mh extends bi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const sc=new me,Zo=new ua,Hr=new Wi,Vr=new T;class Sh extends Ue{constructor(t=new He,e=new Mh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Hr.radius+=r,t.ray.intersectsSphere(Hr)===!1)return;sc.copy(i).invert(),Zo.copy(t.ray).applyMatrix4(sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const m=Math.max(0,a.start),u=Math.min(l.count,a.start+a.count);for(let _=m,g=u;_<g;_++){const f=l.getX(_);Vr.fromBufferAttribute(d,f),rc(Vr,f,c,i,t,e,this)}}else{const m=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let _=m,g=u;_<g;_++)Vr.fromBufferAttribute(d,_),rc(Vr,_,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function rc(s,t,e,n,i,r,a){const o=Zo.distanceSqToPoint(s);if(o<e){const c=new T;Zo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Ei extends rn{constructor(t,e,n,i,r,a,o,c,l){super(t,e,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yh extends rn{constructor(t,e,n=Hi,i,r,a,o=yn,c=yn,l,h=nr,d=1){if(h!==nr&&h!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:t,height:e,depth:d};super(m,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ul(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class wh extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Es extends He{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],c=[],l=[],h=e/2,d=Math.PI/2*t,m=e,u=2*d+m,_=n*2+r,g=i+1,f=new T,p=new T;for(let w=0;w<=_;w++){let v=0,x=0,A=0,E=0;if(w<=n){const y=w/n,S=y*Math.PI/2;x=-h-t*Math.cos(S),A=t*Math.sin(S),E=-t*Math.cos(S),v=y*d}else if(w<=n+r){const y=(w-n)/r;x=-h+y*e,A=t,E=0,v=d+y*m}else{const y=(w-n-r)/n,S=y*Math.PI/2;x=h+t*Math.sin(S),A=t*Math.cos(S),E=t*Math.sin(S),v=d+m+y*d}const C=Math.max(0,Math.min(1,v/u));let I=0;w===0?I=.5/i:w===_&&(I=-.5/i);for(let y=0;y<=i;y++){const S=y/i,D=S*Math.PI*2,N=Math.sin(D),k=Math.cos(D);p.x=-A*k,p.y=x,p.z=A*N,o.push(p.x,p.y,p.z),f.set(-A*k,E,A*N),f.normalize(),c.push(f.x,f.y,f.z),l.push(S+I,C)}if(w>0){const y=(w-1)*g;for(let S=0;S<i;S++){const D=y+S,N=y+S+1,k=w*g+S,K=w*g+S+1;a.push(D,N,k),a.push(N,K,k)}}}this.setIndex(a),this.setAttribute("position",new be(o,3)),this.setAttribute("normal",new be(c,3)),this.setAttribute("uv",new be(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class ar extends He{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new T,h=new Rt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,m=3;d<=e;d++,m+=3){const u=n+d/e*i;l.x=t*Math.cos(u),l.y=t*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[m]/t+1)/2,h.y=(a[m+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new be(a,3)),this.setAttribute("normal",new be(o,3)),this.setAttribute("uv",new be(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Se extends He{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],m=[],u=[];let _=0;const g=[],f=n/2;let p=0;w(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new be(d,3)),this.setAttribute("normal",new be(m,3)),this.setAttribute("uv",new be(u,2));function w(){const x=new T,A=new T;let E=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const y=[],S=I/r,D=S*(e-t)+t;for(let N=0;N<=i;N++){const k=N/i,K=k*c+o,B=Math.sin(K),Y=Math.cos(K);A.x=D*B,A.y=-S*n+f,A.z=D*Y,d.push(A.x,A.y,A.z),x.set(B,C,Y).normalize(),m.push(x.x,x.y,x.z),u.push(k,1-S),y.push(_++)}g.push(y)}for(let I=0;I<i;I++)for(let y=0;y<r;y++){const S=g[y][I],D=g[y+1][I],N=g[y+1][I+1],k=g[y][I+1];(t>0||y!==0)&&(h.push(S,D,k),E+=3),(e>0||y!==r-1)&&(h.push(D,N,k),E+=3)}l.addGroup(p,E,0),p+=E}function v(x){const A=_,E=new Rt,C=new T;let I=0;const y=x===!0?t:e,S=x===!0?1:-1;for(let N=1;N<=i;N++)d.push(0,f*S,0),m.push(0,S,0),u.push(.5,.5),_++;const D=_;for(let N=0;N<=i;N++){const K=N/i*c+o,B=Math.cos(K),Y=Math.sin(K);C.x=y*Y,C.y=f*S,C.z=y*B,d.push(C.x,C.y,C.z),m.push(0,S,0),E.x=B*.5+.5,E.y=Y*.5*S+.5,u.push(E.x,E.y),_++}for(let N=0;N<i;N++){const k=A+N,K=D+N;x===!0?h.push(K,K+1,k):h.push(K+1,K,k),I+=3}l.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ml extends Se{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ml(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gl extends He{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new be(r,3)),this.setAttribute("normal",new be(r.slice(),3)),this.setAttribute("uv",new be(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const v=new T,x=new T,A=new T;for(let E=0;E<e.length;E+=3)u(e[E+0],v),u(e[E+1],x),u(e[E+2],A),c(v,x,A,w)}function c(w,v,x,A){const E=A+1,C=[];for(let I=0;I<=E;I++){C[I]=[];const y=w.clone().lerp(x,I/E),S=v.clone().lerp(x,I/E),D=E-I;for(let N=0;N<=D;N++)N===0&&I===E?C[I][N]=y:C[I][N]=y.clone().lerp(S,N/D)}for(let I=0;I<E;I++)for(let y=0;y<2*(E-I)-1;y++){const S=Math.floor(y/2);y%2===0?(m(C[I][S+1]),m(C[I+1][S]),m(C[I][S])):(m(C[I][S+1]),m(C[I+1][S+1]),m(C[I+1][S]))}}function l(w){const v=new T;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(w),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const w=new T;for(let v=0;v<r.length;v+=3){w.x=r[v+0],w.y=r[v+1],w.z=r[v+2];const x=f(w)/2/Math.PI+.5,A=p(w)/Math.PI+.5;a.push(x,1-A)}_(),d()}function d(){for(let w=0;w<a.length;w+=6){const v=a[w+0],x=a[w+2],A=a[w+4],E=Math.max(v,x,A),C=Math.min(v,x,A);E>.9&&C<.1&&(v<.2&&(a[w+0]+=1),x<.2&&(a[w+2]+=1),A<.2&&(a[w+4]+=1))}}function m(w){r.push(w.x,w.y,w.z)}function u(w,v){const x=w*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function _(){const w=new T,v=new T,x=new T,A=new T,E=new Rt,C=new Rt,I=new Rt;for(let y=0,S=0;y<r.length;y+=9,S+=6){w.set(r[y+0],r[y+1],r[y+2]),v.set(r[y+3],r[y+4],r[y+5]),x.set(r[y+6],r[y+7],r[y+8]),E.set(a[S+0],a[S+1]),C.set(a[S+2],a[S+3]),I.set(a[S+4],a[S+5]),A.copy(w).add(v).add(x).divideScalar(3);const D=f(A);g(E,S+0,w,D),g(C,S+2,v,D),g(I,S+4,x,D)}}function g(w,v,x,A){A<0&&w.x===1&&(a[v]=w.x-1),x.x===0&&x.z===0&&(a[v]=A/2/Math.PI+.5)}function f(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gl(t.vertices,t.indices,t.radius,t.details)}}class _l extends gl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _l(t.radius,t.detail)}}class pd{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const h=n[i],m=n[i+1]-h,u=(a-h)/m;return(i+u)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=e||(a.isVector2?new Rt:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new T,i=[],r=[],a=[],o=new T,c=new me;for(let u=0;u<=t;u++){const _=u/t;i[u]=this.getTangentAt(_,new T)}r[0]=new T,a[0]=new T;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),m=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),m<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(i[u-1],i[u]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(oe(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(c.makeRotationAxis(o,_))}a[u].crossVectors(i[u],r[u])}if(e===!0){let u=Math.acos(oe(r[0].dot(r[t]),-1,1));u/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(i[_],u*_)),a[_].crossVectors(i[_],r[_])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function vl(){let s=0,t=0,e=0,n=0;function i(r,a,o,c){s=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let m=(a-r)/l-(o-r)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+d)+(c-o)/d;m*=h,u*=h,i(a,o,m,u)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Gr=new T,Wa=new vl,Xa=new vl,qa=new vl;class md extends pd{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new T){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Gr.subVectors(i[0],i[1]).add(i[0]),l=Gr);const d=i[o%r],m=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Gr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Gr),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(d),u),g=Math.pow(d.distanceToSquared(m),u),f=Math.pow(m.distanceToSquared(h),u);g<1e-4&&(g=1),_<1e-4&&(_=g),f<1e-4&&(f=g),Wa.initNonuniformCatmullRom(l.x,d.x,m.x,h.x,_,g,f),Xa.initNonuniformCatmullRom(l.y,d.y,m.y,h.y,_,g,f),qa.initNonuniformCatmullRom(l.z,d.z,m.z,h.z,_,g,f)}else this.curveType==="catmullrom"&&(Wa.initCatmullRom(l.x,d.x,m.x,h.x,this.tension),Xa.initCatmullRom(l.y,d.y,m.y,h.y,this.tension),qa.initCatmullRom(l.z,d.z,m.z,h.z,this.tension));return n.set(Wa.calc(c),Xa.calc(c),qa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new T().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class $e extends He{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=t/o,m=e/c,u=[],_=[],g=[],f=[];for(let p=0;p<h;p++){const w=p*m-a;for(let v=0;v<l;v++){const x=v*d-r;_.push(x,-w,0),g.push(0,0,1),f.push(v/o),f.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<o;w++){const v=w+l*p,x=w+l*(p+1),A=w+1+l*(p+1),E=w+1+l*p;u.push(v,x,E),u.push(x,A,E)}this.setIndex(u),this.setAttribute("position",new be(_,3)),this.setAttribute("normal",new be(g,3)),this.setAttribute("uv",new be(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.width,t.height,t.widthSegments,t.heightSegments)}}class pn extends He{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new T,m=new T,u=[],_=[],g=[],f=[];for(let p=0;p<=n;p++){const w=[],v=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){const E=A/e;d.x=-t*Math.cos(i+E*r)*Math.sin(a+v*o),d.y=t*Math.cos(a+v*o),d.z=t*Math.sin(i+E*r)*Math.sin(a+v*o),_.push(d.x,d.y,d.z),m.copy(d).normalize(),g.push(m.x,m.y,m.z),f.push(E+x,1-v),w.push(l++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){const v=h[p][w+1],x=h[p][w],A=h[p+1][w],E=h[p+1][w+1];(p!==0||a>0)&&u.push(v,x,E),(p!==n-1||c<Math.PI)&&u.push(x,A,E)}this.setIndex(u),this.setAttribute("position",new be(_,3)),this.setAttribute("normal",new be(g,3)),this.setAttribute("uv",new be(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class gi extends He{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],h=new T,d=new T,m=new T;for(let u=0;u<=n;u++)for(let _=0;_<=i;_++){const g=_/i*r,f=u/n*Math.PI*2;d.x=(t+e*Math.cos(f))*Math.cos(g),d.y=(t+e*Math.cos(f))*Math.sin(g),d.z=e*Math.sin(f),o.push(d.x,d.y,d.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),m.subVectors(d,h).normalize(),c.push(m.x,m.y,m.z),l.push(_/i),l.push(u/n)}for(let u=1;u<=n;u++)for(let _=1;_<=i;_++){const g=(i+1)*u+_-1,f=(i+1)*(u-1)+_-1,p=(i+1)*(u-1)+_,w=(i+1)*u+_;a.push(g,f,w),a.push(f,p,w)}this.setIndex(a),this.setAttribute("position",new be(o,3)),this.setAttribute("normal",new be(c,3)),this.setAttribute("uv",new be(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class gd extends Qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Vt extends bi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _d extends Vt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Rt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class vd extends bi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xd extends bi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class da extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class bh extends da{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ya=new me,ac=new T,oc=new T;class xl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pl,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(ac),oc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(oc),e.updateMatrixWorld(),Ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ya)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Md extends xl{constructor(){super(new un(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=ws*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Sd extends da{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Md}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const lc=new me,Ys=new T,ja=new T;class yd extends xl{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new Re(2,1,1,1),new Re(0,1,1,1),new Re(3,1,1,1),new Re(1,1,1,1),new Re(3,0,1,1),new Re(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ys.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ys),ja.copy(n.position),ja.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ja),n.updateMatrixWorld(),i.makeTranslation(-Ys.x,-Ys.y,-Ys.z),lc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lc,n.coordinateSystem,n.reversedDepth)}}class vs extends da{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new yd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ml extends gh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class wd extends xl{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qs extends da{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new wd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class bd extends un{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Eh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const cc=new me;class Th{constructor(t,e,n=0,i=1/0){this.ray=new ua(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new dl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return cc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cc),this}intersectObject(t,e=!0,n=[]){return $o(t,this,n,e),n.sort(hc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)$o(t[i],this,n,e);return n.sort(hc),n}}function hc(s,t){return s.distance-t.distance}function $o(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)$o(r[a],t,e,!0)}}function uc(s,t,e,n){const i=Ed(n);switch(e){case rh:return s*t;case al:return s*t/i.components*i.byteLength;case ol:return s*t/i.components*i.byteLength;case oh:return s*t*2/i.components*i.byteLength;case ll:return s*t*2/i.components*i.byteLength;case ah:return s*t*3/i.components*i.byteLength;case On:return s*t*4/i.components*i.byteLength;case cl:return s*t*4/i.components*i.byteLength;case $r:case Jr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Qr:case ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case So:case wo:return Math.max(s,16)*Math.max(t,8)/4;case Mo:case yo:return Math.max(s,8)*Math.max(t,8)/2;case bo:case Eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case To:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Po:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Io:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Do:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case zo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ko:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ho:case Vo:case Go:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Wo:case Xo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case qo:case Yo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ed(s){switch(s){case qn:case eh:return{byteLength:1,components:1};case tr:case nh:case Xn:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Hi:case il:case Gn:return{byteLength:4,components:1};case ih:case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);function Ah(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Td(s){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,m=s.createBuffer();s.bindBuffer(c,m),s.bufferData(c,l,h),o.onUploadCallback();let u;if(l instanceof Float32Array)u=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?u=s.HALF_FLOAT:u=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=s.SHORT;else if(l instanceof Uint32Array)u=s.UNSIGNED_INT;else if(l instanceof Int32Array)u=s.INT;else if(l instanceof Int8Array)u=s.BYTE;else if(l instanceof Uint8Array)u=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:m,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,h);else{d.sort((u,_)=>u.start-_.start);let m=0;for(let u=1;u<d.length;u++){const _=d[m],g=d[u];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++m,d[m]=g)}d.length=m+1;for(let u=0,_=d.length;u<_;u++){const g=d[u];s.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Ad=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ld=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ud=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$d=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ef=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sf="gl_FragColor = linearToOutputTexel( gl_FragColor );",rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,df=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ef=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Af=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,If=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Df=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ff=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Of=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,np=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ip=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,op=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,up=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_p=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ap=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Up=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Np=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,r0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ae={alphahash_fragment:Ad,alphahash_pars_fragment:Rd,alphamap_fragment:Cd,alphamap_pars_fragment:Pd,alphatest_fragment:Id,alphatest_pars_fragment:Dd,aomap_fragment:Ld,aomap_pars_fragment:Ud,batching_pars_vertex:Nd,batching_vertex:Fd,begin_vertex:zd,beginnormal_vertex:Od,bsdfs:Bd,iridescence_fragment:kd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Gd,clipping_planes_pars_vertex:Wd,clipping_planes_vertex:Xd,color_fragment:qd,color_pars_fragment:Yd,color_pars_vertex:jd,color_vertex:Kd,common:Zd,cube_uv_reflection_fragment:$d,defaultnormal_vertex:Jd,displacementmap_pars_vertex:Qd,displacementmap_vertex:tf,emissivemap_fragment:ef,emissivemap_pars_fragment:nf,colorspace_fragment:sf,colorspace_pars_fragment:rf,envmap_fragment:af,envmap_common_pars_fragment:of,envmap_pars_fragment:lf,envmap_pars_vertex:cf,envmap_physical_pars_fragment:Mf,envmap_vertex:hf,fog_vertex:uf,fog_pars_vertex:df,fog_fragment:ff,fog_pars_fragment:pf,gradientmap_pars_fragment:mf,lightmap_pars_fragment:gf,lights_lambert_fragment:_f,lights_lambert_pars_fragment:vf,lights_pars_begin:xf,lights_toon_fragment:Sf,lights_toon_pars_fragment:yf,lights_phong_fragment:wf,lights_phong_pars_fragment:bf,lights_physical_fragment:Ef,lights_physical_pars_fragment:Tf,lights_fragment_begin:Af,lights_fragment_maps:Rf,lights_fragment_end:Cf,logdepthbuf_fragment:Pf,logdepthbuf_pars_fragment:If,logdepthbuf_pars_vertex:Df,logdepthbuf_vertex:Lf,map_fragment:Uf,map_pars_fragment:Nf,map_particle_fragment:Ff,map_particle_pars_fragment:zf,metalnessmap_fragment:Of,metalnessmap_pars_fragment:Bf,morphinstance_vertex:kf,morphcolor_vertex:Hf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Gf,morphtarget_vertex:Wf,normal_fragment_begin:Xf,normal_fragment_maps:qf,normal_pars_fragment:Yf,normal_pars_vertex:jf,normal_vertex:Kf,normalmap_pars_fragment:Zf,clearcoat_normal_fragment_begin:$f,clearcoat_normal_fragment_maps:Jf,clearcoat_pars_fragment:Qf,iridescence_pars_fragment:tp,opaque_fragment:ep,packing:np,premultiplied_alpha_fragment:ip,project_vertex:sp,dithering_fragment:rp,dithering_pars_fragment:ap,roughnessmap_fragment:op,roughnessmap_pars_fragment:lp,shadowmap_pars_fragment:cp,shadowmap_pars_vertex:hp,shadowmap_vertex:up,shadowmask_pars_fragment:dp,skinbase_vertex:fp,skinning_pars_vertex:pp,skinning_vertex:mp,skinnormal_vertex:gp,specularmap_fragment:_p,specularmap_pars_fragment:vp,tonemapping_fragment:xp,tonemapping_pars_fragment:Mp,transmission_fragment:Sp,transmission_pars_fragment:yp,uv_pars_fragment:wp,uv_pars_vertex:bp,uv_vertex:Ep,worldpos_vertex:Tp,background_vert:Ap,background_frag:Rp,backgroundCube_vert:Cp,backgroundCube_frag:Pp,cube_vert:Ip,cube_frag:Dp,depth_vert:Lp,depth_frag:Up,distanceRGBA_vert:Np,distanceRGBA_frag:Fp,equirect_vert:zp,equirect_frag:Op,linedashed_vert:Bp,linedashed_frag:kp,meshbasic_vert:Hp,meshbasic_frag:Vp,meshlambert_vert:Gp,meshlambert_frag:Wp,meshmatcap_vert:Xp,meshmatcap_frag:qp,meshnormal_vert:Yp,meshnormal_frag:jp,meshphong_vert:Kp,meshphong_frag:Zp,meshphysical_vert:$p,meshphysical_frag:Jp,meshtoon_vert:Qp,meshtoon_frag:t0,points_vert:e0,points_frag:n0,shadow_vert:i0,shadow_frag:s0,sprite_vert:r0,sprite_frag:a0},xt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},Hn={basic:{uniforms:hn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:hn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:hn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:hn([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:hn([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:hn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:hn([xt.points,xt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:hn([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:hn([xt.common,xt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:hn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:hn([xt.sprite,xt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distanceRGBA:{uniforms:hn([xt.common,xt.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distanceRGBA_vert,fragmentShader:ae.distanceRGBA_frag},shadow:{uniforms:hn([xt.lights,xt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};Hn.physical={uniforms:hn([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};const Wr={r:0,b:0,g:0},Di=new Bn,o0=new me;function l0(s,t,e,n,i,r,a){const o=new ee(0);let c=r===!0?0:1,l,h,d=null,m=0,u=null;function _(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function g(v){let x=!1;const A=_(v);A===null?p(o,c):A&&A.isColor&&(p(A,1),x=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function f(v,x){const A=_(x);A&&(A.isCubeTexture||A.mapping===ha)?(h===void 0&&(h=new dt(new yt(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:bs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Di.copy(x.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(o0.makeRotationFromEuler(Di)),h.material.toneMapped=de.getTransfer(A.colorSpace)!==xe,(d!==A||m!==A.version||u!==s.toneMapping)&&(h.material.needsUpdate=!0,d=A,m=A.version,u=s.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new dt(new $e(2,2),new Qe({name:"BackgroundMaterial",uniforms:bs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=de.getTransfer(A.colorSpace)!==xe,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||m!==A.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,d=A,m=A.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,x){v.getRGB(Wr,mh(s)),n.buffers.color.setClear(Wr.r,Wr.g,Wr.b,x,a)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(o,c)},render:g,addToRenderList:f,dispose:w}}function c0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=m(null);let r=i,a=!1;function o(S,D,N,k,K){let B=!1;const Y=d(k,N,D);r!==Y&&(r=Y,l(r.object)),B=u(S,k,N,K),B&&_(S,k,N,K),K!==null&&t.update(K,s.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,x(S,D,N,k),K!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function c(){return s.createVertexArray()}function l(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function d(S,D,N){const k=N.wireframe===!0;let K=n[S.id];K===void 0&&(K={},n[S.id]=K);let B=K[D.id];B===void 0&&(B={},K[D.id]=B);let Y=B[k];return Y===void 0&&(Y=m(c()),B[k]=Y),Y}function m(S){const D=[],N=[],k=[];for(let K=0;K<e;K++)D[K]=0,N[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:k,object:S,attributes:{},index:null}}function u(S,D,N,k){const K=r.attributes,B=D.attributes;let Y=0;const nt=N.getAttributes();for(const W in nt)if(nt[W].location>=0){const j=K[W];let gt=B[W];if(gt===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(gt=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(gt=S.instanceColor)),j===void 0||j.attribute!==gt||gt&&j.data!==gt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function _(S,D,N,k){const K={},B=D.attributes;let Y=0;const nt=N.getAttributes();for(const W in nt)if(nt[W].location>=0){let j=B[W];j===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(j=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(j=S.instanceColor));const gt={};gt.attribute=j,j&&j.data&&(gt.data=j.data),K[W]=gt,Y++}r.attributes=K,r.attributesNum=Y,r.index=k}function g(){const S=r.newAttributes;for(let D=0,N=S.length;D<N;D++)S[D]=0}function f(S){p(S,0)}function p(S,D){const N=r.newAttributes,k=r.enabledAttributes,K=r.attributeDivisors;N[S]=1,k[S]===0&&(s.enableVertexAttribArray(S),k[S]=1),K[S]!==D&&(s.vertexAttribDivisor(S,D),K[S]=D)}function w(){const S=r.newAttributes,D=r.enabledAttributes;for(let N=0,k=D.length;N<k;N++)D[N]!==S[N]&&(s.disableVertexAttribArray(N),D[N]=0)}function v(S,D,N,k,K,B,Y){Y===!0?s.vertexAttribIPointer(S,D,N,K,B):s.vertexAttribPointer(S,D,N,k,K,B)}function x(S,D,N,k){g();const K=k.attributes,B=N.getAttributes(),Y=D.defaultAttributeValues;for(const nt in B){const W=B[nt];if(W.location>=0){let ut=K[nt];if(ut===void 0&&(nt==="instanceMatrix"&&S.instanceMatrix&&(ut=S.instanceMatrix),nt==="instanceColor"&&S.instanceColor&&(ut=S.instanceColor)),ut!==void 0){const j=ut.normalized,gt=ut.itemSize,It=t.get(ut);if(It===void 0)continue;const jt=It.buffer,re=It.type,$t=It.bytesPerElement,Z=re===s.INT||re===s.UNSIGNED_INT||ut.gpuType===il;if(ut.isInterleavedBufferAttribute){const st=ut.data,bt=st.stride,Ht=ut.offset;if(st.isInstancedInterleavedBuffer){for(let Ft=0;Ft<W.locationSize;Ft++)p(W.location+Ft,st.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ft=0;Ft<W.locationSize;Ft++)f(W.location+Ft);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let Ft=0;Ft<W.locationSize;Ft++)v(W.location+Ft,gt/W.locationSize,re,j,bt*$t,(Ht+gt/W.locationSize*Ft)*$t,Z)}else{if(ut.isInstancedBufferAttribute){for(let st=0;st<W.locationSize;st++)p(W.location+st,ut.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let st=0;st<W.locationSize;st++)f(W.location+st);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let st=0;st<W.locationSize;st++)v(W.location+st,gt/W.locationSize,re,j,gt*$t,gt/W.locationSize*st*$t,Z)}}else if(Y!==void 0){const j=Y[nt];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(W.location,j);break;case 3:s.vertexAttrib3fv(W.location,j);break;case 4:s.vertexAttrib4fv(W.location,j);break;default:s.vertexAttrib1fv(W.location,j)}}}}w()}function A(){I();for(const S in n){const D=n[S];for(const N in D){const k=D[N];for(const K in k)h(k[K].object),delete k[K];delete D[N]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const N in D){const k=D[N];for(const K in k)h(k[K].object),delete k[K];delete D[N]}delete n[S.id]}function C(S){for(const D in n){const N=n[D];if(N[S.id]===void 0)continue;const k=N[S.id];for(const K in k)h(k[K].object),delete k[K];delete N[S.id]}}function I(){y(),a=!0,r!==i&&(r=i,l(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:f,disableUnusedAttributes:w}}function h0(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let u=0;for(let _=0;_<d;_++)u+=h[_];e.update(u,n,1)}function c(l,h,d,m){if(d===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let _=0;_<l.length;_++)a(l[_],h[_],m[_]);else{u.multiDrawArraysInstancedWEBGL(n,l,0,h,0,m,0,d);let _=0;for(let g=0;g<d;g++)_+=h[g]*m[g];e.update(_,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function u0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==On&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const I=C===Xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==qn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Gn&&!I)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),f=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:m,maxTextures:u,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:w,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:A,maxSamples:E}}function d0(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Ui,o=new se,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,m){const u=d.length!==0||m||n!==0||i;return i=m,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,m){e=h(d,m,0)},this.setState=function(d,m,u){const _=d.clippingPlanes,g=d.clipIntersection,f=d.clipShadows,p=s.get(d);if(!i||_===null||_.length===0||r&&!f)r?h(null):l();else{const w=r?0:n,v=w*4;let x=p.clippingState||null;c.value=x,x=h(_,m,v,u);for(let A=0;A!==v;++A)x[A]=e[A];p.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,m,u,_){const g=d!==null?d.length:0;let f=null;if(g!==0){if(f=c.value,_!==!0||f===null){const p=u+g*4,w=m.matrixWorldInverse;o.getNormalMatrix(w),(f===null||f.length<p)&&(f=new Float32Array(p));for(let v=0,x=u;v!==g;++v,x+=4)a.copy(d[v]).applyMatrix4(w,o),a.normal.toArray(f,x),f[x+3]=a.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,f}}function f0(s){let t=new WeakMap;function e(a,o){return o===_o?a.mapping=Ms:o===vo&&(a.mapping=Ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===_o||o===vo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new rd(c.height);return l.fromEquirectangularTexture(s,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const gs=4,dc=[.125,.215,.35,.446,.526,.582],zi=20,Ka=new Ml,fc=new ee;let Za=null,$a=0,Ja=0,Qa=!1;const Ni=(1+Math.sqrt(5))/2,ps=1/Ni,pc=[new T(-Ni,ps,0),new T(Ni,ps,0),new T(-ps,0,Ni),new T(ps,0,Ni),new T(0,Ni,-ps),new T(0,Ni,ps),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],p0=new T;class Jo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=p0}=r;Za=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),Ja=this._renderer.getActiveMipmapLevel(),Qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Za,$a,Ja),this._renderer.xr.enabled=Qa,t.scissorTest=!1,Xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Za=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),Ja=this._renderer.getActiveMipmapLevel(),Qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Xn,format:On,colorSpace:ys,depthBuffer:!1},i=mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=m0(r)),this._blurMaterial=g0(r,t,e)}return i}_compileMaterial(t){const e=new dt(this._lodPlanes[0],t);this._renderer.compile(e,Ka)}_sceneToCubeUV(t,e,n,i,r){const c=new un(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,m=d.autoClear,u=d.toneMapping;d.getClearColor(fc),d.toneMapping=xi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));const g=new Mi({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),f=new dt(new yt,g);let p=!1;const w=t.background;w?w.isColor&&(g.color.copy(w),t.background=null,p=!0):(g.color.copy(fc),p=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):x===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));const A=this._cubeSize;Xr(i,x*A,v>2?A:0,A,A),d.setRenderTarget(i),p&&d.render(f,c),d.render(t,c)}f.geometry.dispose(),f.material.dispose(),d.toneMapping=u,d.autoClear=m,t.background=w}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ms||t.mapping===Ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Xr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ka)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=pc[(i-r-1)%pc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new dt(this._lodPlanes[i],l),m=l.uniforms,u=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*zi-1),g=r/_,f=isFinite(r)?1+Math.floor(h*g):zi;f>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${zi}`);const p=[];let w=0;for(let C=0;C<zi;++C){const I=C/g,y=Math.exp(-I*I/2);p.push(y),C===0?w+=y:C<f&&(w+=2*y)}for(let C=0;C<p.length;C++)p[C]=p[C]/w;m.envMap.value=t.texture,m.samples.value=f,m.weights.value=p,m.latitudinal.value=a==="latitudinal",o&&(m.poleAxis.value=o);const{_lodMax:v}=this;m.dTheta.value=_,m.mipInt.value=v-n;const x=this._sizeLods[i],A=3*x*(i>v-gs?i-v+gs:0),E=4*(this._cubeSize-x);Xr(e,A,E,3*x,2*x),c.setRenderTarget(e),c.render(d,Ka)}}function m0(s){const t=[],e=[],n=[];let i=s;const r=s-gs+1+dc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>s-gs?c=dc[a-s+gs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,m=[h,h,d,h,d,d,h,h,d,d,h,d],u=6,_=6,g=3,f=2,p=1,w=new Float32Array(g*_*u),v=new Float32Array(f*_*u),x=new Float32Array(p*_*u);for(let E=0;E<u;E++){const C=E%3*2/3-1,I=E>2?0:-1,y=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];w.set(y,g*_*E),v.set(m,f*_*E);const S=[E,E,E,E,E,E];x.set(S,p*_*E)}const A=new He;A.setAttribute("position",new Je(w,g)),A.setAttribute("uv",new Je(v,f)),A.setAttribute("faceIndex",new Je(x,p)),t.push(A),i>gs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function mc(s,t,e){const n=new Pn(s,t,e);return n.texture.mapping=ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function g0(s,t,e){const n=new Float32Array(zi),i=new T(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function gc(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function _c(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _0(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===_o||c===vo,h=c===Ms||c===Ss;if(l||h){let d=t.get(o);const m=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==m)return e===null&&(e=new Jo(s)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const u=o.image;return l&&u&&u.height>0||h&&u&&i(u)?(e===null&&(e=new Jo(s)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function v0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&sr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function x0(s,t,e,n){const i={},r=new WeakMap;function a(d){const m=d.target;m.index!==null&&t.remove(m.index);for(const _ in m.attributes)t.remove(m.attributes[_]);m.removeEventListener("dispose",a),delete i[m.id];const u=r.get(m);u&&(t.remove(u),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function o(d,m){return i[m.id]===!0||(m.addEventListener("dispose",a),i[m.id]=!0,e.memory.geometries++),m}function c(d){const m=d.attributes;for(const u in m)t.update(m[u],s.ARRAY_BUFFER)}function l(d){const m=[],u=d.index,_=d.attributes.position;let g=0;if(u!==null){const w=u.array;g=u.version;for(let v=0,x=w.length;v<x;v+=3){const A=w[v+0],E=w[v+1],C=w[v+2];m.push(A,E,E,C,C,A)}}else if(_!==void 0){const w=_.array;g=_.version;for(let v=0,x=w.length/3-1;v<x;v+=3){const A=v+0,E=v+1,C=v+2;m.push(A,E,E,C,C,A)}}else return;const f=new(hh(m)?ph:fh)(m,1);f.version=g;const p=r.get(d);p&&t.remove(p),r.set(d,f)}function h(d){const m=r.get(d);if(m){const u=d.index;u!==null&&m.version<u.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function M0(s,t,e){let n;function i(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function c(m,u){s.drawElements(n,u,r,m*a),e.update(u,n,1)}function l(m,u,_){_!==0&&(s.drawElementsInstanced(n,u,r,m*a,_),e.update(u,n,_))}function h(m,u,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,_);let f=0;for(let p=0;p<_;p++)f+=u[p];e.update(f,n,1)}function d(m,u,_,g){if(_===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<m.length;p++)l(m[p]/a,u[p],g[p]);else{f.multiDrawElementsInstancedWEBGL(n,u,0,r,m,0,g,0,_);let p=0;for(let w=0;w<_;w++)p+=u[w]*g[w];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function S0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function y0(s,t,e){const n=new WeakMap,i=new Re;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let m=n.get(o);if(m===void 0||m.count!==d){let S=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var u=S;m!==void 0&&m.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),g===!0&&(x=2),f===!0&&(x=3);let A=o.attributes.position.count*x,E=1;A>t.maxTextureSize&&(E=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const C=new Float32Array(A*E*4*d),I=new uh(C,A,E,d);I.type=Gn,I.needsUpdate=!0;const y=x*4;for(let D=0;D<d;D++){const N=p[D],k=w[D],K=v[D],B=A*E*4*D;for(let Y=0;Y<N.count;Y++){const nt=Y*y;_===!0&&(i.fromBufferAttribute(N,Y),C[B+nt+0]=i.x,C[B+nt+1]=i.y,C[B+nt+2]=i.z,C[B+nt+3]=0),g===!0&&(i.fromBufferAttribute(k,Y),C[B+nt+4]=i.x,C[B+nt+5]=i.y,C[B+nt+6]=i.z,C[B+nt+7]=0),f===!0&&(i.fromBufferAttribute(K,Y),C[B+nt+8]=i.x,C[B+nt+9]=i.y,C[B+nt+10]=i.z,C[B+nt+11]=K.itemSize===4?i.w:1)}}m={count:d,texture:I,size:new Rt(A,E)},n.set(o,m),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let _=0;for(let f=0;f<l.length;f++)_+=l[f];const g=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}return{update:r}}function w0(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const m=c.skeleton;i.get(m)!==l&&(m.update(),i.set(m,l))}return d}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const Rh=new rn,vc=new yh(1,1),Ch=new uh,Ph=new Gu,Ih=new _h,xc=[],Mc=[],Sc=new Float32Array(16),yc=new Float32Array(9),wc=new Float32Array(4);function Cs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=xc[i];if(r===void 0&&(r=new Float32Array(i),xc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ye(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function je(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function fa(s,t){let e=Mc[t];e===void 0&&(e=new Int32Array(t),Mc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function b0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function E0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;s.uniform2fv(this.addr,t),je(e,t)}}function T0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ye(e,t))return;s.uniform3fv(this.addr,t),je(e,t)}}function A0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;s.uniform4fv(this.addr,t),je(e,t)}}function R0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),je(e,t)}else{if(Ye(e,n))return;wc.set(n),s.uniformMatrix2fv(this.addr,!1,wc),je(e,n)}}function C0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),je(e,t)}else{if(Ye(e,n))return;yc.set(n),s.uniformMatrix3fv(this.addr,!1,yc),je(e,n)}}function P0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),je(e,t)}else{if(Ye(e,n))return;Sc.set(n),s.uniformMatrix4fv(this.addr,!1,Sc),je(e,n)}}function I0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function D0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;s.uniform2iv(this.addr,t),je(e,t)}}function L0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;s.uniform3iv(this.addr,t),je(e,t)}}function U0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;s.uniform4iv(this.addr,t),je(e,t)}}function N0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function F0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;s.uniform2uiv(this.addr,t),je(e,t)}}function z0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;s.uniform3uiv(this.addr,t),je(e,t)}}function O0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;s.uniform4uiv(this.addr,t),je(e,t)}}function B0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(vc.compareFunction=ch,r=vc):r=Rh,e.setTexture2D(t||r,i)}function k0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Ph,i)}function H0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ih,i)}function V0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ch,i)}function G0(s){switch(s){case 5126:return b0;case 35664:return E0;case 35665:return T0;case 35666:return A0;case 35674:return R0;case 35675:return C0;case 35676:return P0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return L0;case 35669:case 35673:return U0;case 5125:return N0;case 36294:return F0;case 36295:return z0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}function W0(s,t){s.uniform1fv(this.addr,t)}function X0(s,t){const e=Cs(t,this.size,2);s.uniform2fv(this.addr,e)}function q0(s,t){const e=Cs(t,this.size,3);s.uniform3fv(this.addr,e)}function Y0(s,t){const e=Cs(t,this.size,4);s.uniform4fv(this.addr,e)}function j0(s,t){const e=Cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function K0(s,t){const e=Cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Z0(s,t){const e=Cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function $0(s,t){s.uniform1iv(this.addr,t)}function J0(s,t){s.uniform2iv(this.addr,t)}function Q0(s,t){s.uniform3iv(this.addr,t)}function tm(s,t){s.uniform4iv(this.addr,t)}function em(s,t){s.uniform1uiv(this.addr,t)}function nm(s,t){s.uniform2uiv(this.addr,t)}function im(s,t){s.uniform3uiv(this.addr,t)}function sm(s,t){s.uniform4uiv(this.addr,t)}function rm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);Ye(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Rh,r[a])}function am(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);Ye(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Ph,r[a])}function om(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);Ye(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Ih,r[a])}function lm(s,t,e){const n=this.cache,i=t.length,r=fa(e,i);Ye(n,r)||(s.uniform1iv(this.addr,r),je(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Ch,r[a])}function cm(s){switch(s){case 5126:return W0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return j0;case 35675:return K0;case 35676:return Z0;case 5124:case 35670:return $0;case 35667:case 35671:return J0;case 35668:case 35672:return Q0;case 35669:case 35673:return tm;case 5125:return em;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return lm}}class hm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=G0(e.type)}}class um{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cm(e.type)}}class dm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const to=/(\w+)(\])?(\[|\.)?/g;function bc(s,t){s.seq.push(t),s.map[t.id]=t}function fm(s,t,e){const n=s.name,i=n.length;for(to.lastIndex=0;;){const r=to.exec(n),a=to.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){bc(e,l===void 0?new hm(o,s,t):new um(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new dm(o),bc(e,d)),e=d}}}class ea{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);fm(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ec(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const pm=37297;let mm=0;function gm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Tc=new se;function _m(s){de._getMatrix(Tc,de.workingColorSpace,s);const t=`mat3( ${Tc.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(s)){case ia:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ac(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+gm(s.getShaderSource(t),o)}else return r}function vm(s,t){const e=_m(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function xm(s,t){let e;switch(t){case jc:e="Linear";break;case Kc:e="Reinhard";break;case Zc:e="Cineon";break;case nl:e="ACESFilmic";break;case Jc:e="AgX";break;case Qc:e="Neutral";break;case $c:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const qr=new T;function Mm(){de.getLuminanceCoefficients(qr);const s=qr.x.toFixed(4),t=qr.y.toFixed(4),e=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function ym(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Zs(s){return s!==""}function Rc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qo(s){return s.replace(bm,Tm)}const Em=new Map;function Tm(s,t){let e=ae[t];if(e===void 0){const n=Em.get(t);if(n!==void 0)e=ae[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qo(e)}const Am=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pc(s){return s.replace(Am,Rm)}function Rm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ic(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Cm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Xc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===qc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ti&&(t="SHADOWMAP_TYPE_VSM"),t}function Pm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ms:case Ss:t="ENVMAP_TYPE_CUBE";break;case ha:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Im(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Ss&&(t="ENVMAP_MODE_REFRACTION"),t}function Dm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Yc:t="ENVMAP_BLENDING_MULTIPLY";break;case ou:t="ENVMAP_BLENDING_MIX";break;case lu:t="ENVMAP_BLENDING_ADD";break}return t}function Lm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Um(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Cm(e),l=Pm(e),h=Im(e),d=Dm(e),m=Lm(e),u=Sm(e),_=ym(r),g=i.createProgram();let f,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Zs).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Zs).join(`
`),p.length>0&&(p+=`
`)):(f=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),p=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?ae.tonemapping_pars_fragment:"",e.toneMapping!==xi?xm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,vm("linearToOutputTexel",e.outputColorSpace),Mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),a=Qo(a),a=Rc(a,e),a=Cc(a,e),o=Qo(o),o=Rc(o,e),o=Cc(o,e),a=Pc(a),o=Pc(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,f=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===Dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=w+f+a,x=w+p+o,A=Ec(i,i.VERTEX_SHADER,v),E=Ec(i,i.FRAGMENT_SHADER,x);i.attachShader(g,A),i.attachShader(g,E),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function C(D){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(g)||"",k=i.getShaderInfoLog(A)||"",K=i.getShaderInfoLog(E)||"",B=N.trim(),Y=k.trim(),nt=K.trim();let W=!0,ut=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,A,E);else{const j=Ac(i,A,"vertex"),gt=Ac(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+j+`
`+gt)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(Y===""||nt==="")&&(ut=!1);ut&&(D.diagnostics={runnable:W,programLog:B,vertexShader:{log:Y,prefix:f},fragmentShader:{log:nt,prefix:p}})}i.deleteShader(A),i.deleteShader(E),I=new ea(i,g),y=wm(i,g)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(g,pm)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mm++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=A,this.fragmentShader=E,this}let Nm=0;class Fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new zm(t),e.set(t,n)),n}}class zm{constructor(t){this.id=Nm++,this.code=t,this.usedTimes=0}}function Om(s,t,e,n,i,r,a){const o=new dl,c=new Fm,l=new Set,h=[],d=i.logarithmicDepthBuffer,m=i.vertexTextures;let u=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function f(y,S,D,N,k){const K=N.fog,B=k.geometry,Y=y.isMeshStandardMaterial?N.environment:null,nt=(y.isMeshStandardMaterial?e:t).get(y.envMap||Y),W=nt&&nt.mapping===ha?nt.image.height:null,ut=_[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const j=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,gt=j!==void 0?j.length:0;let It=0;B.morphAttributes.position!==void 0&&(It=1),B.morphAttributes.normal!==void 0&&(It=2),B.morphAttributes.color!==void 0&&(It=3);let jt,re,$t,Z;if(ut){const ue=Hn[ut];jt=ue.vertexShader,re=ue.fragmentShader}else jt=y.vertexShader,re=y.fragmentShader,c.update(y),$t=c.getVertexShaderID(y),Z=c.getFragmentShaderID(y);const st=s.getRenderTarget(),bt=s.state.buffers.depth.getReversed(),Ht=k.isInstancedMesh===!0,Ft=k.isBatchedMesh===!0,ne=!!y.map,Ne=!!y.matcap,P=!!nt,Ee=!!y.aoMap,Zt=!!y.lightMap,Gt=!!y.bumpMap,Tt=!!y.normalMap,he=!!y.displacementMap,St=!!y.emissiveMap,ie=!!y.metalnessMap,Be=!!y.roughnessMap,De=y.anisotropy>0,R=y.clearcoat>0,M=y.dispersion>0,O=y.iridescence>0,$=y.sheen>0,tt=y.transmission>0,J=De&&!!y.anisotropyMap,zt=R&&!!y.clearcoatMap,ht=R&&!!y.clearcoatNormalMap,Dt=R&&!!y.clearcoatRoughnessMap,Ct=O&&!!y.iridescenceMap,at=O&&!!y.iridescenceThicknessMap,vt=$&&!!y.sheenColorMap,qt=$&&!!y.sheenRoughnessMap,Ut=!!y.specularMap,_t=!!y.specularColorMap,Qt=!!y.specularIntensityMap,L=tt&&!!y.transmissionMap,rt=tt&&!!y.thicknessMap,ft=!!y.gradientMap,wt=!!y.alphaMap,ot=y.alphaTest>0,et=!!y.alphaHash,Pt=!!y.extensions;let Jt=xi;y.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Jt=s.toneMapping);const ve={shaderID:ut,shaderType:y.type,shaderName:y.name,vertexShader:jt,fragmentShader:re,defines:y.defines,customVertexShaderID:$t,customFragmentShaderID:Z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ft,batchingColor:Ft&&k._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&k.instanceColor!==null,instancingMorph:Ht&&k.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:st===null?s.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ys,alphaToCoverage:!!y.alphaToCoverage,map:ne,matcap:Ne,envMap:P,envMapMode:P&&nt.mapping,envMapCubeUVHeight:W,aoMap:Ee,lightMap:Zt,bumpMap:Gt,normalMap:Tt,displacementMap:m&&he,emissiveMap:St,normalMapObjectSpace:Tt&&y.normalMapType===du,normalMapTangentSpace:Tt&&y.normalMapType===lh,metalnessMap:ie,roughnessMap:Be,anisotropy:De,anisotropyMap:J,clearcoat:R,clearcoatMap:zt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Dt,dispersion:M,iridescence:O,iridescenceMap:Ct,iridescenceThicknessMap:at,sheen:$,sheenColorMap:vt,sheenRoughnessMap:qt,specularMap:Ut,specularColorMap:_t,specularIntensityMap:Qt,transmission:tt,transmissionMap:L,thicknessMap:rt,gradientMap:ft,opaque:y.transparent===!1&&y.blending===vi&&y.alphaToCoverage===!1,alphaMap:wt,alphaTest:ot,alphaHash:et,combine:y.combine,mapUv:ne&&g(y.map.channel),aoMapUv:Ee&&g(y.aoMap.channel),lightMapUv:Zt&&g(y.lightMap.channel),bumpMapUv:Gt&&g(y.bumpMap.channel),normalMapUv:Tt&&g(y.normalMap.channel),displacementMapUv:he&&g(y.displacementMap.channel),emissiveMapUv:St&&g(y.emissiveMap.channel),metalnessMapUv:ie&&g(y.metalnessMap.channel),roughnessMapUv:Be&&g(y.roughnessMap.channel),anisotropyMapUv:J&&g(y.anisotropyMap.channel),clearcoatMapUv:zt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ht&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Dt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:at&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:qt&&g(y.sheenRoughnessMap.channel),specularMapUv:Ut&&g(y.specularMap.channel),specularColorMapUv:_t&&g(y.specularColorMap.channel),specularIntensityMapUv:Qt&&g(y.specularIntensityMap.channel),transmissionMapUv:L&&g(y.transmissionMap.channel),thicknessMapUv:rt&&g(y.thicknessMap.channel),alphaMapUv:wt&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||De),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(ne||wt),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:bt,skinning:k.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:It,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Jt,decodeVideoTexture:ne&&y.map.isVideoTexture===!0&&de.getTransfer(y.map.colorSpace)===xe,decodeVideoTextureEmissive:St&&y.emissiveMap.isVideoTexture===!0&&de.getTransfer(y.emissiveMap.colorSpace)===xe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===sn,flipSided:y.side===dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&y.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ve.vertexUv1s=l.has(1),ve.vertexUv2s=l.has(2),ve.vertexUv3s=l.has(3),l.clear(),ve}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)S.push(D),S.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(w(S,y),v(S,y),S.push(s.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function w(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function v(y,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const S=_[y.type];let D;if(S){const N=Hn[S];D=rr.clone(N.uniforms)}else D=y.uniforms;return D}function A(y,S){let D;for(let N=0,k=h.length;N<k;N++){const K=h[N];if(K.cacheKey===S){D=K,++D.usedTimes;break}}return D===void 0&&(D=new Um(s,S,y,r),h.push(D)),D}function E(y){if(--y.usedTimes===0){const S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function C(y){c.remove(y)}function I(){c.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:I}}function Bm(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function km(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Dc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Lc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,m,u,_,g,f){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:m,material:u,groupOrder:_,renderOrder:d.renderOrder,z:g,group:f},s[t]=p):(p.id=d.id,p.object=d,p.geometry=m,p.material=u,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=f),t++,p}function o(d,m,u,_,g,f){const p=a(d,m,u,_,g,f);u.transmission>0?n.push(p):u.transparent===!0?i.push(p):e.push(p)}function c(d,m,u,_,g,f){const p=a(d,m,u,_,g,f);u.transmission>0?n.unshift(p):u.transparent===!0?i.unshift(p):e.unshift(p)}function l(d,m){e.length>1&&e.sort(d||km),n.length>1&&n.sort(m||Dc),i.length>1&&i.sort(m||Dc)}function h(){for(let d=t,m=s.length;d<m;d++){const u=s[d];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function Hm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Lc,s.set(n,[a])):i>=r.length?(a=new Lc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Vm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new ee};break;case"SpotLight":e={position:new T,direction:new T,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new T,halfWidth:new T,halfHeight:new T};break}return s[t.id]=e,e}}}function Gm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Wm=0;function Xm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function qm(s){const t=new Vm,e=Gm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);const i=new T,r=new me,a=new me;function o(l){let h=0,d=0,m=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let u=0,_=0,g=0,f=0,p=0,w=0,v=0,x=0,A=0,E=0,C=0;l.sort(Xm);for(let y=0,S=l.length;y<S;y++){const D=l[y],N=D.color,k=D.intensity,K=D.distance,B=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=N.r*k,d+=N.g*k,m+=N.b*k;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],k);C++}else if(D.isDirectionalLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const nt=D.shadow,W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.directionalShadow[u]=W,n.directionalShadowMap[u]=B,n.directionalShadowMatrix[u]=D.shadow.matrix,w++}n.directional[u]=Y,u++}else if(D.isSpotLight){const Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(N).multiplyScalar(k),Y.distance=K,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[g]=Y;const nt=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,nt.updateMatrices(D),D.castShadow&&E++),n.spotLightMatrix[g]=nt.matrix,D.castShadow){const W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.spotShadow[g]=W,n.spotShadowMap[g]=B,x++}g++}else if(D.isRectAreaLight){const Y=t.get(D);Y.color.copy(N).multiplyScalar(k),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[f]=Y,f++}else if(D.isPointLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const nt=D.shadow,W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,W.shadowCameraNear=nt.camera.near,W.shadowCameraFar=nt.camera.far,n.pointShadow[_]=W,n.pointShadowMap[_]=B,n.pointShadowMatrix[_]=D.shadow.matrix,v++}n.point[_]=Y,_++}else if(D.isHemisphereLight){const Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(k),Y.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=Y,p++}}f>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=m;const I=n.hash;(I.directionalLength!==u||I.pointLength!==_||I.spotLength!==g||I.rectAreaLength!==f||I.hemiLength!==p||I.numDirectionalShadows!==w||I.numPointShadows!==v||I.numSpotShadows!==x||I.numSpotMaps!==A||I.numLightProbes!==C)&&(n.directional.length=u,n.spot.length=g,n.rectArea.length=f,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,I.directionalLength=u,I.pointLength=_,I.spotLength=g,I.rectAreaLength=f,I.hemiLength=p,I.numDirectionalShadows=w,I.numPointShadows=v,I.numSpotShadows=x,I.numSpotMaps=A,I.numLightProbes=C,n.version=Wm++)}function c(l,h){let d=0,m=0,u=0,_=0,g=0;const f=h.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){const v=l[p];if(v.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(f),d++}else if(v.isSpotLight){const x=n.spot[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(f),u++}else if(v.isRectAreaLight){const x=n.rectArea[_];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),a.identity(),r.copy(v.matrixWorld),r.premultiply(f),a.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){const x=n.point[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),m++}else if(v.isHemisphereLight){const x=n.hemi[g];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(f),g++}}}return{setup:o,setupView:c,state:n}}function Uc(s){const t=new qm(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Ym(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Uc(s),t.set(i,[o])):r>=a.length?(o=new Uc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const jm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Km=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zm(s,t,e){let n=new pl;const i=new Rt,r=new Rt,a=new Re,o=new vd({depthPacking:uu}),c=new xd,l={},h=e.maxTextureSize,d={[Si]:dn,[dn]:Si,[sn]:sn},m=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:jm,fragmentShader:Km}),u=m.clone();u.defines.HORIZONTAL_PASS=1;const _=new He;_.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new dt(_,m),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xc;let p=this.type;this.render=function(E,C,I){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;const y=s.getRenderTarget(),S=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),N=s.state;N.setBlending(ni),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=p!==ti&&this.type===ti,K=p===ti&&this.type!==ti;for(let B=0,Y=E.length;B<Y;B++){const nt=E[B],W=nt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ut=W.getFrameExtents();if(i.multiply(ut),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ut.x),i.x=r.x*ut.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ut.y),i.y=r.y*ut.y,W.mapSize.y=r.y)),W.map===null||k===!0||K===!0){const gt=this.type!==ti?{minFilter:yn,magFilter:yn}:{};W.map!==null&&W.map.dispose(),W.map=new Pn(i.x,i.y,gt),W.map.texture.name=nt.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const j=W.getViewportCount();for(let gt=0;gt<j;gt++){const It=W.getViewport(gt);a.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),N.viewport(a),W.updateMatrices(nt,gt),n=W.getFrustum(),x(C,I,W.camera,nt,this.type)}W.isPointLightShadow!==!0&&this.type===ti&&w(W,I),W.needsUpdate=!1}p=this.type,f.needsUpdate=!1,s.setRenderTarget(y,S,D)};function w(E,C){const I=t.update(g);m.defines.VSM_SAMPLES!==E.blurSamples&&(m.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,m.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Pn(i.x,i.y)),m.uniforms.shadow_pass.value=E.map.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,I,m,g,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,I,u,g,null)}function v(E,C,I,y){let S=null;const D=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)S=D;else if(S=I.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=S.uuid,k=C.uuid;let K=l[N];K===void 0&&(K={},l[N]=K);let B=K[k];B===void 0&&(B=S.clone(),K[k]=B,C.addEventListener("dispose",A)),S=B}if(S.visible=C.visible,S.wireframe=C.wireframe,y===ti?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:d[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const N=s.properties.get(S);N.light=I}return S}function x(E,C,I,y,S){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===ti)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);const k=t.update(E),K=E.material;if(Array.isArray(K)){const B=k.groups;for(let Y=0,nt=B.length;Y<nt;Y++){const W=B[Y],ut=K[W.materialIndex];if(ut&&ut.visible){const j=v(E,ut,y,S);E.onBeforeShadow(s,E,C,I,k,j,W),s.renderBufferDirect(I,null,k,j,E,W),E.onAfterShadow(s,E,C,I,k,j,W)}}}else if(K.visible){const B=v(E,K,y,S);E.onBeforeShadow(s,E,C,I,k,B,null),s.renderBufferDirect(I,null,k,B,E,null),E.onAfterShadow(s,E,C,I,k,B,null)}}const N=E.children;for(let k=0,K=N.length;k<K;k++)x(N[k],C,I,y,S)}function A(E){E.target.removeEventListener("dispose",A);for(const I in l){const y=l[I],S=E.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const $m={[co]:ho,[uo]:mo,[fo]:go,[xs]:po,[ho]:co,[mo]:uo,[go]:fo,[po]:xs};function Jm(s,t){function e(){let L=!1;const rt=new Re;let ft=null;const wt=new Re(0,0,0,0);return{setMask:function(ot){ft!==ot&&!L&&(s.colorMask(ot,ot,ot,ot),ft=ot)},setLocked:function(ot){L=ot},setClear:function(ot,et,Pt,Jt,ve){ve===!0&&(ot*=Jt,et*=Jt,Pt*=Jt),rt.set(ot,et,Pt,Jt),wt.equals(rt)===!1&&(s.clearColor(ot,et,Pt,Jt),wt.copy(rt))},reset:function(){L=!1,ft=null,wt.set(-1,0,0,0)}}}function n(){let L=!1,rt=!1,ft=null,wt=null,ot=null;return{setReversed:function(et){if(rt!==et){const Pt=t.get("EXT_clip_control");et?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),rt=et;const Jt=ot;ot=null,this.setClear(Jt)}},getReversed:function(){return rt},setTest:function(et){et?st(s.DEPTH_TEST):bt(s.DEPTH_TEST)},setMask:function(et){ft!==et&&!L&&(s.depthMask(et),ft=et)},setFunc:function(et){if(rt&&(et=$m[et]),wt!==et){switch(et){case co:s.depthFunc(s.NEVER);break;case ho:s.depthFunc(s.ALWAYS);break;case uo:s.depthFunc(s.LESS);break;case xs:s.depthFunc(s.LEQUAL);break;case fo:s.depthFunc(s.EQUAL);break;case po:s.depthFunc(s.GEQUAL);break;case mo:s.depthFunc(s.GREATER);break;case go:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}wt=et}},setLocked:function(et){L=et},setClear:function(et){ot!==et&&(rt&&(et=1-et),s.clearDepth(et),ot=et)},reset:function(){L=!1,ft=null,wt=null,ot=null,rt=!1}}}function i(){let L=!1,rt=null,ft=null,wt=null,ot=null,et=null,Pt=null,Jt=null,ve=null;return{setTest:function(ue){L||(ue?st(s.STENCIL_TEST):bt(s.STENCIL_TEST))},setMask:function(ue){rt!==ue&&!L&&(s.stencilMask(ue),rt=ue)},setFunc:function(ue,Te,wn){(ft!==ue||wt!==Te||ot!==wn)&&(s.stencilFunc(ue,Te,wn),ft=ue,wt=Te,ot=wn)},setOp:function(ue,Te,wn){(et!==ue||Pt!==Te||Jt!==wn)&&(s.stencilOp(ue,Te,wn),et=ue,Pt=Te,Jt=wn)},setLocked:function(ue){L=ue},setClear:function(ue){ve!==ue&&(s.clearStencil(ue),ve=ue)},reset:function(){L=!1,rt=null,ft=null,wt=null,ot=null,et=null,Pt=null,Jt=null,ve=null}}}const r=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},d={},m=new WeakMap,u=[],_=null,g=!1,f=null,p=null,w=null,v=null,x=null,A=null,E=null,C=new ee(0,0,0),I=0,y=!1,S=null,D=null,N=null,k=null,K=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,nt=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=nt>=1):W.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=nt>=2);let ut=null,j={};const gt=s.getParameter(s.SCISSOR_BOX),It=s.getParameter(s.VIEWPORT),jt=new Re().fromArray(gt),re=new Re().fromArray(It);function $t(L,rt,ft,wt){const ot=new Uint8Array(4),et=s.createTexture();s.bindTexture(L,et),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Pt=0;Pt<ft;Pt++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(rt,0,s.RGBA,1,1,wt,0,s.RGBA,s.UNSIGNED_BYTE,ot):s.texImage2D(rt+Pt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ot);return et}const Z={};Z[s.TEXTURE_2D]=$t(s.TEXTURE_2D,s.TEXTURE_2D,1),Z[s.TEXTURE_CUBE_MAP]=$t(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[s.TEXTURE_2D_ARRAY]=$t(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Z[s.TEXTURE_3D]=$t(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(s.DEPTH_TEST),a.setFunc(xs),Gt(!1),Tt(Rl),st(s.CULL_FACE),Ee(ni);function st(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function bt(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Ht(L,rt){return d[L]!==rt?(s.bindFramebuffer(L,rt),d[L]=rt,L===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=rt),L===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=rt),!0):!1}function Ft(L,rt){let ft=u,wt=!1;if(L){ft=m.get(rt),ft===void 0&&(ft=[],m.set(rt,ft));const ot=L.textures;if(ft.length!==ot.length||ft[0]!==s.COLOR_ATTACHMENT0){for(let et=0,Pt=ot.length;et<Pt;et++)ft[et]=s.COLOR_ATTACHMENT0+et;ft.length=ot.length,wt=!0}}else ft[0]!==s.BACK&&(ft[0]=s.BACK,wt=!0);wt&&s.drawBuffers(ft)}function ne(L){return _!==L?(s.useProgram(L),_=L,!0):!1}const Ne={[Fi]:s.FUNC_ADD,[Wh]:s.FUNC_SUBTRACT,[Xh]:s.FUNC_REVERSE_SUBTRACT};Ne[qh]=s.MIN,Ne[Yh]=s.MAX;const P={[jh]:s.ZERO,[Kh]:s.ONE,[Zh]:s.SRC_COLOR,[oo]:s.SRC_ALPHA,[nu]:s.SRC_ALPHA_SATURATE,[tu]:s.DST_COLOR,[Jh]:s.DST_ALPHA,[$h]:s.ONE_MINUS_SRC_COLOR,[lo]:s.ONE_MINUS_SRC_ALPHA,[eu]:s.ONE_MINUS_DST_COLOR,[Qh]:s.ONE_MINUS_DST_ALPHA,[iu]:s.CONSTANT_COLOR,[su]:s.ONE_MINUS_CONSTANT_COLOR,[ru]:s.CONSTANT_ALPHA,[au]:s.ONE_MINUS_CONSTANT_ALPHA};function Ee(L,rt,ft,wt,ot,et,Pt,Jt,ve,ue){if(L===ni){g===!0&&(bt(s.BLEND),g=!1);return}if(g===!1&&(st(s.BLEND),g=!0),L!==Gh){if(L!==f||ue!==y){if((p!==Fi||x!==Fi)&&(s.blendEquation(s.FUNC_ADD),p=Fi,x=Fi),ue)switch(L){case vi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xn:s.blendFunc(s.ONE,s.ONE);break;case Cl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case vi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Cl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,v=null,A=null,E=null,C.set(0,0,0),I=0,f=L,y=ue}return}ot=ot||rt,et=et||ft,Pt=Pt||wt,(rt!==p||ot!==x)&&(s.blendEquationSeparate(Ne[rt],Ne[ot]),p=rt,x=ot),(ft!==w||wt!==v||et!==A||Pt!==E)&&(s.blendFuncSeparate(P[ft],P[wt],P[et],P[Pt]),w=ft,v=wt,A=et,E=Pt),(Jt.equals(C)===!1||ve!==I)&&(s.blendColor(Jt.r,Jt.g,Jt.b,ve),C.copy(Jt),I=ve),f=L,y=!1}function Zt(L,rt){L.side===sn?bt(s.CULL_FACE):st(s.CULL_FACE);let ft=L.side===dn;rt&&(ft=!ft),Gt(ft),L.blending===vi&&L.transparent===!1?Ee(ni):Ee(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const wt=L.stencilWrite;o.setTest(wt),wt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),St(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?st(s.SAMPLE_ALPHA_TO_COVERAGE):bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(L){S!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),S=L)}function Tt(L){L!==Hh?(st(s.CULL_FACE),L!==D&&(L===Rl?s.cullFace(s.BACK):L===Vh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):bt(s.CULL_FACE),D=L}function he(L){L!==N&&(Y&&s.lineWidth(L),N=L)}function St(L,rt,ft){L?(st(s.POLYGON_OFFSET_FILL),(k!==rt||K!==ft)&&(s.polygonOffset(rt,ft),k=rt,K=ft)):bt(s.POLYGON_OFFSET_FILL)}function ie(L){L?st(s.SCISSOR_TEST):bt(s.SCISSOR_TEST)}function Be(L){L===void 0&&(L=s.TEXTURE0+B-1),ut!==L&&(s.activeTexture(L),ut=L)}function De(L,rt,ft){ft===void 0&&(ut===null?ft=s.TEXTURE0+B-1:ft=ut);let wt=j[ft];wt===void 0&&(wt={type:void 0,texture:void 0},j[ft]=wt),(wt.type!==L||wt.texture!==rt)&&(ut!==ft&&(s.activeTexture(ft),ut=ft),s.bindTexture(L,rt||Z[L]),wt.type=L,wt.texture=rt)}function R(){const L=j[ut];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{s.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{s.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{s.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function zt(){try{s.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ht(){try{s.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Dt(){try{s.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ct(){try{s.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{s.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function vt(L){jt.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),jt.copy(L))}function qt(L){re.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),re.copy(L))}function Ut(L,rt){let ft=l.get(rt);ft===void 0&&(ft=new WeakMap,l.set(rt,ft));let wt=ft.get(L);wt===void 0&&(wt=s.getUniformBlockIndex(rt,L.name),ft.set(L,wt))}function _t(L,rt){const wt=l.get(rt).get(L);c.get(rt)!==wt&&(s.uniformBlockBinding(rt,wt,L.__bindingPointIndex),c.set(rt,wt))}function Qt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ut=null,j={},d={},m=new WeakMap,u=[],_=null,g=!1,f=null,p=null,w=null,v=null,x=null,A=null,E=null,C=new ee(0,0,0),I=0,y=!1,S=null,D=null,N=null,k=null,K=null,jt.set(0,0,s.canvas.width,s.canvas.height),re.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:st,disable:bt,bindFramebuffer:Ht,drawBuffers:Ft,useProgram:ne,setBlending:Ee,setMaterial:Zt,setFlipSided:Gt,setCullFace:Tt,setLineWidth:he,setPolygonOffset:St,setScissorTest:ie,activeTexture:Be,bindTexture:De,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:O,texImage2D:Ct,texImage3D:at,updateUBOMapping:Ut,uniformBlockBinding:_t,texStorage2D:ht,texStorage3D:Dt,texSubImage2D:$,texSubImage3D:tt,compressedTexSubImage2D:J,compressedTexSubImage3D:zt,scissor:vt,viewport:qt,reset:Qt}}function Qm(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Rt,h=new WeakMap;let d;const m=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,M){return u?new OffscreenCanvas(R,M):ra("canvas")}function g(R,M,O){let $=1;const tt=De(R);if((tt.width>O||tt.height>O)&&($=O/Math.max(tt.width,tt.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const J=Math.floor($*tt.width),zt=Math.floor($*tt.height);d===void 0&&(d=_(J,zt));const ht=M?_(J,zt):d;return ht.width=J,ht.height=zt,ht.getContext("2d").drawImage(R,0,0,J,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+zt+")."),ht}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),R;return R}function f(R){return R.generateMipmaps}function p(R){s.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(R,M,O,$,tt=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let J=M;if(M===s.RED&&(O===s.FLOAT&&(J=s.R32F),O===s.HALF_FLOAT&&(J=s.R16F),O===s.UNSIGNED_BYTE&&(J=s.R8)),M===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(J=s.R8UI),O===s.UNSIGNED_SHORT&&(J=s.R16UI),O===s.UNSIGNED_INT&&(J=s.R32UI),O===s.BYTE&&(J=s.R8I),O===s.SHORT&&(J=s.R16I),O===s.INT&&(J=s.R32I)),M===s.RG&&(O===s.FLOAT&&(J=s.RG32F),O===s.HALF_FLOAT&&(J=s.RG16F),O===s.UNSIGNED_BYTE&&(J=s.RG8)),M===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(J=s.RG8UI),O===s.UNSIGNED_SHORT&&(J=s.RG16UI),O===s.UNSIGNED_INT&&(J=s.RG32UI),O===s.BYTE&&(J=s.RG8I),O===s.SHORT&&(J=s.RG16I),O===s.INT&&(J=s.RG32I)),M===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(J=s.RGB8UI),O===s.UNSIGNED_SHORT&&(J=s.RGB16UI),O===s.UNSIGNED_INT&&(J=s.RGB32UI),O===s.BYTE&&(J=s.RGB8I),O===s.SHORT&&(J=s.RGB16I),O===s.INT&&(J=s.RGB32I)),M===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),O===s.UNSIGNED_INT&&(J=s.RGBA32UI),O===s.BYTE&&(J=s.RGBA8I),O===s.SHORT&&(J=s.RGBA16I),O===s.INT&&(J=s.RGBA32I)),M===s.RGB&&(O===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),M===s.RGBA){const zt=tt?ia:de.getTransfer($);O===s.FLOAT&&(J=s.RGBA32F),O===s.HALF_FLOAT&&(J=s.RGBA16F),O===s.UNSIGNED_BYTE&&(J=zt===xe?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(R,M){let O;return R?M===null||M===Hi||M===er?O=s.DEPTH24_STENCIL8:M===Gn?O=s.DEPTH32F_STENCIL8:M===tr&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Hi||M===er?O=s.DEPTH_COMPONENT24:M===Gn?O=s.DEPTH_COMPONENT32F:M===tr&&(O=s.DEPTH_COMPONENT16),O}function A(R,M){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==yn&&R.minFilter!==Vn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function E(R){const M=R.target;M.removeEventListener("dispose",E),I(M),M.isVideoTexture&&h.delete(M)}function C(R){const M=R.target;M.removeEventListener("dispose",C),S(M)}function I(R){const M=n.get(R);if(M.__webglInit===void 0)return;const O=R.source,$=m.get(O);if($){const tt=$[M.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&y(R),Object.keys($).length===0&&m.delete(O)}n.remove(R)}function y(R){const M=n.get(R);s.deleteTexture(M.__webglTexture);const O=R.source,$=m.get(O);delete $[M.__cacheKey],a.memory.textures--}function S(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let tt=0;tt<M.__webglFramebuffer[$].length;tt++)s.deleteFramebuffer(M.__webglFramebuffer[$][tt]);else s.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)s.deleteFramebuffer(M.__webglFramebuffer[$]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=R.textures;for(let $=0,tt=O.length;$<tt;$++){const J=n.get(O[$]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(O[$])}n.remove(R)}let D=0;function N(){D=0}function k(){const R=D;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),D+=1,R}function K(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function B(R,M){const O=n.get(R);if(R.isVideoTexture&&ie(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const $=R.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(O,R,M);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+M)}function Y(R,M){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){Z(O,R,M);return}e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+M)}function nt(R,M){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){Z(O,R,M);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+M)}function W(R,M){const O=n.get(R);if(R.version>0&&O.__version!==R.version){st(O,R,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+M)}const ut={[yi]:s.REPEAT,[Oi]:s.CLAMP_TO_EDGE,[xo]:s.MIRRORED_REPEAT},j={[yn]:s.NEAREST,[cu]:s.NEAREST_MIPMAP_NEAREST,[gr]:s.NEAREST_MIPMAP_LINEAR,[Vn]:s.LINEAR,[xa]:s.LINEAR_MIPMAP_NEAREST,[Bi]:s.LINEAR_MIPMAP_LINEAR},gt={[fu]:s.NEVER,[xu]:s.ALWAYS,[pu]:s.LESS,[ch]:s.LEQUAL,[mu]:s.EQUAL,[vu]:s.GEQUAL,[gu]:s.GREATER,[_u]:s.NOTEQUAL};function It(R,M){if(M.type===Gn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Vn||M.magFilter===xa||M.magFilter===gr||M.magFilter===Bi||M.minFilter===Vn||M.minFilter===xa||M.minFilter===gr||M.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ut[M.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ut[M.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ut[M.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,j[M.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,j[M.minFilter]),M.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,gt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===yn||M.minFilter!==gr&&M.minFilter!==Bi||M.type===Gn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function jt(R,M){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",E));const $=M.source;let tt=m.get($);tt===void 0&&(tt={},m.set($,tt));const J=K(M);if(J!==R.__cacheKey){tt[J]===void 0&&(tt[J]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),tt[J].usedTimes++;const zt=tt[R.__cacheKey];zt!==void 0&&(tt[R.__cacheKey].usedTimes--,zt.usedTimes===0&&y(M)),R.__cacheKey=J,R.__webglTexture=tt[J].texture}return O}function re(R,M,O){return Math.floor(Math.floor(R/O)/M)}function $t(R,M,O,$){const J=R.updateRanges;if(J.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,O,$,M.data);else{J.sort((at,vt)=>at.start-vt.start);let zt=0;for(let at=1;at<J.length;at++){const vt=J[zt],qt=J[at],Ut=vt.start+vt.count,_t=re(qt.start,M.width,4),Qt=re(vt.start,M.width,4);qt.start<=Ut+1&&_t===Qt&&re(qt.start+qt.count-1,M.width,4)===_t?vt.count=Math.max(vt.count,qt.start+qt.count-vt.start):(++zt,J[zt]=qt)}J.length=zt+1;const ht=s.getParameter(s.UNPACK_ROW_LENGTH),Dt=s.getParameter(s.UNPACK_SKIP_PIXELS),Ct=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let at=0,vt=J.length;at<vt;at++){const qt=J[at],Ut=Math.floor(qt.start/4),_t=Math.ceil(qt.count/4),Qt=Ut%M.width,L=Math.floor(Ut/M.width),rt=_t,ft=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Qt),s.pixelStorei(s.UNPACK_SKIP_ROWS,L),e.texSubImage2D(s.TEXTURE_2D,0,Qt,L,rt,ft,O,$,M.data)}R.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ht),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Dt),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ct)}}function Z(R,M,O){let $=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=s.TEXTURE_3D);const tt=jt(R,M),J=M.source;e.bindTexture($,R.__webglTexture,s.TEXTURE0+O);const zt=n.get(J);if(J.version!==zt.__version||tt===!0){e.activeTexture(s.TEXTURE0+O);const ht=de.getPrimaries(de.workingColorSpace),Dt=M.colorSpace===Rn?null:de.getPrimaries(M.colorSpace),Ct=M.colorSpace===Rn||ht===Dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let at=g(M.image,!1,i.maxTextureSize);at=Be(M,at);const vt=r.convert(M.format,M.colorSpace),qt=r.convert(M.type);let Ut=v(M.internalFormat,vt,qt,M.colorSpace,M.isVideoTexture);It($,M);let _t;const Qt=M.mipmaps,L=M.isVideoTexture!==!0,rt=zt.__version===void 0||tt===!0,ft=J.dataReady,wt=A(M,at);if(M.isDepthTexture)Ut=x(M.format===ir,M.type),rt&&(L?e.texStorage2D(s.TEXTURE_2D,1,Ut,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,Ut,at.width,at.height,0,vt,qt,null));else if(M.isDataTexture)if(Qt.length>0){L&&rt&&e.texStorage2D(s.TEXTURE_2D,wt,Ut,Qt[0].width,Qt[0].height);for(let ot=0,et=Qt.length;ot<et;ot++)_t=Qt[ot],L?ft&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,vt,qt,_t.data):e.texImage2D(s.TEXTURE_2D,ot,Ut,_t.width,_t.height,0,vt,qt,_t.data);M.generateMipmaps=!1}else L?(rt&&e.texStorage2D(s.TEXTURE_2D,wt,Ut,at.width,at.height),ft&&$t(M,at,vt,qt)):e.texImage2D(s.TEXTURE_2D,0,Ut,at.width,at.height,0,vt,qt,at.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){L&&rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,wt,Ut,Qt[0].width,Qt[0].height,at.depth);for(let ot=0,et=Qt.length;ot<et;ot++)if(_t=Qt[ot],M.format!==On)if(vt!==null)if(L){if(ft)if(M.layerUpdates.size>0){const Pt=uc(_t.width,_t.height,M.format,M.type);for(const Jt of M.layerUpdates){const ve=_t.data.subarray(Jt*Pt/_t.data.BYTES_PER_ELEMENT,(Jt+1)*Pt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,Jt,_t.width,_t.height,1,vt,ve)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,_t.width,_t.height,at.depth,vt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ot,Ut,_t.width,_t.height,at.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ft&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,_t.width,_t.height,at.depth,vt,qt,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ot,Ut,_t.width,_t.height,at.depth,0,vt,qt,_t.data)}else{L&&rt&&e.texStorage2D(s.TEXTURE_2D,wt,Ut,Qt[0].width,Qt[0].height);for(let ot=0,et=Qt.length;ot<et;ot++)_t=Qt[ot],M.format!==On?vt!==null?L?ft&&e.compressedTexSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,vt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,ot,Ut,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ft&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,vt,qt,_t.data):e.texImage2D(s.TEXTURE_2D,ot,Ut,_t.width,_t.height,0,vt,qt,_t.data)}else if(M.isDataArrayTexture)if(L){if(rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,wt,Ut,at.width,at.height,at.depth),ft)if(M.layerUpdates.size>0){const ot=uc(at.width,at.height,M.format,M.type);for(const et of M.layerUpdates){const Pt=at.data.subarray(et*ot/at.data.BYTES_PER_ELEMENT,(et+1)*ot/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,et,at.width,at.height,1,vt,qt,Pt)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,vt,qt,at.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ut,at.width,at.height,at.depth,0,vt,qt,at.data);else if(M.isData3DTexture)L?(rt&&e.texStorage3D(s.TEXTURE_3D,wt,Ut,at.width,at.height,at.depth),ft&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,vt,qt,at.data)):e.texImage3D(s.TEXTURE_3D,0,Ut,at.width,at.height,at.depth,0,vt,qt,at.data);else if(M.isFramebufferTexture){if(rt)if(L)e.texStorage2D(s.TEXTURE_2D,wt,Ut,at.width,at.height);else{let ot=at.width,et=at.height;for(let Pt=0;Pt<wt;Pt++)e.texImage2D(s.TEXTURE_2D,Pt,Ut,ot,et,0,vt,qt,null),ot>>=1,et>>=1}}else if(Qt.length>0){if(L&&rt){const ot=De(Qt[0]);e.texStorage2D(s.TEXTURE_2D,wt,Ut,ot.width,ot.height)}for(let ot=0,et=Qt.length;ot<et;ot++)_t=Qt[ot],L?ft&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,vt,qt,_t):e.texImage2D(s.TEXTURE_2D,ot,Ut,vt,qt,_t);M.generateMipmaps=!1}else if(L){if(rt){const ot=De(at);e.texStorage2D(s.TEXTURE_2D,wt,Ut,ot.width,ot.height)}ft&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,vt,qt,at)}else e.texImage2D(s.TEXTURE_2D,0,Ut,vt,qt,at);f(M)&&p($),zt.__version=J.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function st(R,M,O){if(M.image.length!==6)return;const $=jt(R,M),tt=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+O);const J=n.get(tt);if(tt.version!==J.__version||$===!0){e.activeTexture(s.TEXTURE0+O);const zt=de.getPrimaries(de.workingColorSpace),ht=M.colorSpace===Rn?null:de.getPrimaries(M.colorSpace),Dt=M.colorSpace===Rn||zt===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const Ct=M.isCompressedTexture||M.image[0].isCompressedTexture,at=M.image[0]&&M.image[0].isDataTexture,vt=[];for(let et=0;et<6;et++)!Ct&&!at?vt[et]=g(M.image[et],!0,i.maxCubemapSize):vt[et]=at?M.image[et].image:M.image[et],vt[et]=Be(M,vt[et]);const qt=vt[0],Ut=r.convert(M.format,M.colorSpace),_t=r.convert(M.type),Qt=v(M.internalFormat,Ut,_t,M.colorSpace),L=M.isVideoTexture!==!0,rt=J.__version===void 0||$===!0,ft=tt.dataReady;let wt=A(M,qt);It(s.TEXTURE_CUBE_MAP,M);let ot;if(Ct){L&&rt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,wt,Qt,qt.width,qt.height);for(let et=0;et<6;et++){ot=vt[et].mipmaps;for(let Pt=0;Pt<ot.length;Pt++){const Jt=ot[Pt];M.format!==On?Ut!==null?L?ft&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,0,0,Jt.width,Jt.height,Ut,Jt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,Qt,Jt.width,Jt.height,0,Jt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ft&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,0,0,Jt.width,Jt.height,Ut,_t,Jt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,Qt,Jt.width,Jt.height,0,Ut,_t,Jt.data)}}}else{if(ot=M.mipmaps,L&&rt){ot.length>0&&wt++;const et=De(vt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,wt,Qt,et.width,et.height)}for(let et=0;et<6;et++)if(at){L?ft&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,vt[et].width,vt[et].height,Ut,_t,vt[et].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Qt,vt[et].width,vt[et].height,0,Ut,_t,vt[et].data);for(let Pt=0;Pt<ot.length;Pt++){const ve=ot[Pt].image[et].image;L?ft&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,0,0,ve.width,ve.height,Ut,_t,ve.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,Qt,ve.width,ve.height,0,Ut,_t,ve.data)}}else{L?ft&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Ut,_t,vt[et]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Qt,Ut,_t,vt[et]);for(let Pt=0;Pt<ot.length;Pt++){const Jt=ot[Pt];L?ft&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,0,0,Ut,_t,Jt.image[et]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,Qt,Ut,_t,Jt.image[et])}}}f(M)&&p(s.TEXTURE_CUBE_MAP),J.__version=tt.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function bt(R,M,O,$,tt,J){const zt=r.convert(O.format,O.colorSpace),ht=r.convert(O.type),Dt=v(O.internalFormat,zt,ht,O.colorSpace),Ct=n.get(M),at=n.get(O);if(at.__renderTarget=M,!Ct.__hasExternalTextures){const vt=Math.max(1,M.width>>J),qt=Math.max(1,M.height>>J);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,Dt,vt,qt,M.depth,0,zt,ht,null):e.texImage2D(tt,J,Dt,vt,qt,0,zt,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),St(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,tt,at.__webglTexture,0,he(M)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,tt,at.__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(R,M,O){if(s.bindRenderbuffer(s.RENDERBUFFER,R),M.depthBuffer){const $=M.depthTexture,tt=$&&$.isDepthTexture?$.type:null,J=x(M.stencilBuffer,tt),zt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=he(M);St(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,J,M.width,M.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,J,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,J,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,zt,s.RENDERBUFFER,R)}else{const $=M.textures;for(let tt=0;tt<$.length;tt++){const J=$[tt],zt=r.convert(J.format,J.colorSpace),ht=r.convert(J.type),Dt=v(J.internalFormat,zt,ht,J.colorSpace),Ct=he(M);O&&St(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,Dt,M.width,M.height):St(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,Dt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Dt,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ft(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(M.depthTexture);$.__renderTarget=M,(!$.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),B(M.depthTexture,0);const tt=$.__webglTexture,J=he(M);if(M.depthTexture.format===nr)St(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(M.depthTexture.format===ir)St(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ne(R){const M=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const tt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",tt)};$.addEventListener("dispose",tt),M.__depthDisposeCallback=tt}M.__boundDepthTexture=$}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const $=R.texture.mipmaps;$&&$.length>0?Ft(M.__webglFramebuffer[0],R):Ft(M.__webglFramebuffer,R)}else if(O){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=s.createRenderbuffer(),Ht(M.__webglDepthbuffer[$],R,!1);else{const tt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}else{const $=R.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Ht(M.__webglDepthbuffer,R,!1);else{const tt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(R,M,O){const $=n.get(R);M!==void 0&&bt($.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&ne(R)}function P(R){const M=R.texture,O=n.get(R),$=n.get(M);R.addEventListener("dispose",C);const tt=R.textures,J=R.isWebGLCubeRenderTarget===!0,zt=tt.length>1;if(zt||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=M.version,a.memory.textures++),J){O.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[ht]=[];for(let Dt=0;Dt<M.mipmaps.length;Dt++)O.__webglFramebuffer[ht][Dt]=s.createFramebuffer()}else O.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)O.__webglFramebuffer[ht]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(zt)for(let ht=0,Dt=tt.length;ht<Dt;ht++){const Ct=n.get(tt[ht]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&St(R)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ht=0;ht<tt.length;ht++){const Dt=tt[ht];O.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ht]);const Ct=r.convert(Dt.format,Dt.colorSpace),at=r.convert(Dt.type),vt=v(Dt.internalFormat,Ct,at,Dt.colorSpace,R.isXRRenderTarget===!0),qt=he(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,vt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,O.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Ht(O.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),It(s.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let Dt=0;Dt<M.mipmaps.length;Dt++)bt(O.__webglFramebuffer[ht][Dt],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Dt);else bt(O.__webglFramebuffer[ht],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);f(M)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let ht=0,Dt=tt.length;ht<Dt;ht++){const Ct=tt[ht],at=n.get(Ct);let vt=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(vt,at.__webglTexture),It(vt,Ct),bt(O.__webglFramebuffer,R,Ct,s.COLOR_ATTACHMENT0+ht,vt,0),f(Ct)&&p(vt)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ht=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,$.__webglTexture),It(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let Dt=0;Dt<M.mipmaps.length;Dt++)bt(O.__webglFramebuffer[Dt],R,M,s.COLOR_ATTACHMENT0,ht,Dt);else bt(O.__webglFramebuffer,R,M,s.COLOR_ATTACHMENT0,ht,0);f(M)&&p(ht),e.unbindTexture()}R.depthBuffer&&ne(R)}function Ee(R){const M=R.textures;for(let O=0,$=M.length;O<$;O++){const tt=M[O];if(f(tt)){const J=w(R),zt=n.get(tt).__webglTexture;e.bindTexture(J,zt),p(J),e.unbindTexture()}}}const Zt=[],Gt=[];function Tt(R){if(R.samples>0){if(St(R)===!1){const M=R.textures,O=R.width,$=R.height;let tt=s.COLOR_BUFFER_BIT;const J=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,zt=n.get(R),ht=M.length>1;if(ht)for(let Ct=0;Ct<M.length;Ct++)e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer);const Dt=R.texture.mipmaps;Dt&&Dt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let Ct=0;Ct<M.length;Ct++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,zt.__webglColorRenderbuffer[Ct]);const at=n.get(M[Ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,at,0)}s.blitFramebuffer(0,0,O,$,0,0,O,$,tt,s.NEAREST),c===!0&&(Zt.length=0,Gt.length=0,Zt.push(s.COLOR_ATTACHMENT0+Ct),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Zt.push(J),Gt.push(J),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Gt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Zt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let Ct=0;Ct<M.length;Ct++){e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,zt.__webglColorRenderbuffer[Ct]);const at=n.get(M[Ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,at,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const M=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function he(R){return Math.min(i.maxSamples,R.samples)}function St(R){const M=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ie(R){const M=a.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Be(R,M){const O=R.colorSpace,$=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==ys&&O!==Rn&&(de.getTransfer(O)===xe?($!==On||tt!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),M}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=Y,this.setTexture3D=nt,this.setTextureCube=W,this.rebindTextures=Ne,this.setupRenderTarget=P,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=St}function tg(s,t){function e(n,i=Rn){let r;const a=de.getTransfer(i);if(n===qn)return s.UNSIGNED_BYTE;if(n===sl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ih)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===sh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===eh)return s.BYTE;if(n===nh)return s.SHORT;if(n===tr)return s.UNSIGNED_SHORT;if(n===il)return s.INT;if(n===Hi)return s.UNSIGNED_INT;if(n===Gn)return s.FLOAT;if(n===Xn)return s.HALF_FLOAT;if(n===rh)return s.ALPHA;if(n===ah)return s.RGB;if(n===On)return s.RGBA;if(n===nr)return s.DEPTH_COMPONENT;if(n===ir)return s.DEPTH_STENCIL;if(n===al)return s.RED;if(n===ol)return s.RED_INTEGER;if(n===oh)return s.RG;if(n===ll)return s.RG_INTEGER;if(n===cl)return s.RGBA_INTEGER;if(n===$r||n===Jr||n===Qr||n===ta)if(a===xe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===So||n===yo||n===wo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===Eo||n===To)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bo||n===Eo)return a===xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===To)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ao||n===Ro||n===Co||n===Po||n===Io||n===Do||n===Lo||n===Uo||n===No||n===Fo||n===zo||n===Oo||n===Bo||n===ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ao)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Co)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Po)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Io)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Do)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===No)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ko)return a===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ho||n===Vo||n===Go)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ho)return a===xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wo||n===Xo||n===qo||n===Yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===er?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ng=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new wh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Qe({vertexShader:eg,fragmentShader:ng,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new dt(new $e(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sg extends As{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,m=null,u=null,_=null;const g=typeof XRWebGLBinding<"u",f=new ig,p={},w=e.getContextAttributes();let v=null,x=null;const A=[],E=[],C=new Rt;let I=null;const y=new un;y.viewport=new Re;const S=new un;S.viewport=new Re;const D=[y,S],N=new bd;let k=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let st=A[Z];return st===void 0&&(st=new ka,A[Z]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Z){let st=A[Z];return st===void 0&&(st=new ka,A[Z]=st),st.getGripSpace()},this.getHand=function(Z){let st=A[Z];return st===void 0&&(st=new ka,A[Z]=st),st.getHandSpace()};function B(Z){const st=E.indexOf(Z.inputSource);if(st===-1)return;const bt=A[st];bt!==void 0&&(bt.update(Z.inputSource,Z.frame,l||a),bt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",nt);for(let Z=0;Z<A.length;Z++){const st=E[Z];st!==null&&(E[Z]=null,A[Z].disconnect(st))}k=null,K=null,f.reset();for(const Z in p)delete p[Z];t.setRenderTarget(v),u=null,m=null,d=null,i=null,x=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return m!==null?m:u},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(v=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",nt),w.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Ht=null,Ft=null;w.depth&&(Ft=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=w.stencil?ir:nr,Ht=w.stencil?er:Hi);const ne={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:r};d=this.getBinding(),m=d.createProjectionLayer(ne),i.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),x=new Pn(m.textureWidth,m.textureHeight,{format:On,type:qn,depthTexture:new yh(m.textureWidth,m.textureHeight,Ht,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const bt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,e,bt),i.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new Pn(u.framebufferWidth,u.framebufferHeight,{format:On,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),$t.setContext(i),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function nt(Z){for(let st=0;st<Z.removed.length;st++){const bt=Z.removed[st],Ht=E.indexOf(bt);Ht>=0&&(E[Ht]=null,A[Ht].disconnect(bt))}for(let st=0;st<Z.added.length;st++){const bt=Z.added[st];let Ht=E.indexOf(bt);if(Ht===-1){for(let ne=0;ne<A.length;ne++)if(ne>=E.length){E.push(bt),Ht=ne;break}else if(E[ne]===null){E[ne]=bt,Ht=ne;break}if(Ht===-1)break}const Ft=A[Ht];Ft&&Ft.connect(bt)}}const W=new T,ut=new T;function j(Z,st,bt){W.setFromMatrixPosition(st.matrixWorld),ut.setFromMatrixPosition(bt.matrixWorld);const Ht=W.distanceTo(ut),Ft=st.projectionMatrix.elements,ne=bt.projectionMatrix.elements,Ne=Ft[14]/(Ft[10]-1),P=Ft[14]/(Ft[10]+1),Ee=(Ft[9]+1)/Ft[5],Zt=(Ft[9]-1)/Ft[5],Gt=(Ft[8]-1)/Ft[0],Tt=(ne[8]+1)/ne[0],he=Ne*Gt,St=Ne*Tt,ie=Ht/(-Gt+Tt),Be=ie*-Gt;if(st.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Be),Z.translateZ(ie),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ft[10]===-1)Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const De=Ne+ie,R=P+ie,M=he-Be,O=St+(Ht-Be),$=Ee*P/R*De,tt=Zt*P/R*De;Z.projectionMatrix.makePerspective(M,O,$,tt,De,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function gt(Z,st){st===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(st.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let st=Z.near,bt=Z.far;f.texture!==null&&(f.depthNear>0&&(st=f.depthNear),f.depthFar>0&&(bt=f.depthFar)),N.near=S.near=y.near=st,N.far=S.far=y.far=bt,(k!==N.near||K!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),k=N.near,K=N.far),N.layers.mask=Z.layers.mask|6,y.layers.mask=N.layers.mask&3,S.layers.mask=N.layers.mask&5;const Ht=Z.parent,Ft=N.cameras;gt(N,Ht);for(let ne=0;ne<Ft.length;ne++)gt(Ft[ne],Ht);Ft.length===2?j(N,y,S):N.projectionMatrix.copy(y.projectionMatrix),It(Z,N,Ht)};function It(Z,st,bt){bt===null?Z.matrix.copy(st.matrixWorld):(Z.matrix.copy(bt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(st.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ws*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(m===null&&u===null))return c},this.setFoveation=function(Z){c=Z,m!==null&&(m.fixedFoveation=Z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(N)},this.getCameraTexture=function(Z){return p[Z]};let jt=null;function re(Z,st){if(h=st.getViewerPose(l||a),_=st,h!==null){const bt=h.views;u!==null&&(t.setRenderTargetFramebuffer(x,u.framebuffer),t.setRenderTarget(x));let Ht=!1;bt.length!==N.cameras.length&&(N.cameras.length=0,Ht=!0);for(let P=0;P<bt.length;P++){const Ee=bt[P];let Zt=null;if(u!==null)Zt=u.getViewport(Ee);else{const Tt=d.getViewSubImage(m,Ee);Zt=Tt.viewport,P===0&&(t.setRenderTargetTextures(x,Tt.colorTexture,Tt.depthStencilTexture),t.setRenderTarget(x))}let Gt=D[P];Gt===void 0&&(Gt=new un,Gt.layers.enable(P),Gt.viewport=new Re,D[P]=Gt),Gt.matrix.fromArray(Ee.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Ee.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),P===0&&(N.matrix.copy(Gt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ht===!0&&N.cameras.push(Gt)}const Ft=i.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const P=d.getDepthInformation(bt[0]);P&&P.isValid&&P.texture&&f.init(P,i.renderState)}if(Ft&&Ft.includes("camera-access")&&g){t.state.unbindTexture(),d=n.getBinding();for(let P=0;P<bt.length;P++){const Ee=bt[P].camera;if(Ee){let Zt=p[Ee];Zt||(Zt=new wh,p[Ee]=Zt);const Gt=d.getCameraImage(Ee);Zt.sourceTexture=Gt}}}}for(let bt=0;bt<A.length;bt++){const Ht=E[bt],Ft=A[bt];Ht!==null&&Ft!==void 0&&Ft.update(Ht,st,l||a)}jt&&jt(Z,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),_=null}const $t=new Ah;$t.setAnimationLoop(re),this.setAnimationLoop=function(Z){jt=Z},this.dispose=function(){}}}const Li=new Bn,rg=new me;function ag(s,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,mh(s)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function i(f,p,w,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(f,p):p.isMeshToonMaterial?(r(f,p),d(f,p)):p.isMeshPhongMaterial?(r(f,p),h(f,p)):p.isMeshStandardMaterial?(r(f,p),m(f,p),p.isMeshPhysicalMaterial&&u(f,p,x)):p.isMeshMatcapMaterial?(r(f,p),_(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),g(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?c(f,p,w,v):p.isSpriteMaterial?l(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===dn&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===dn&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const w=t.get(p),v=w.envMap,x=w.envMapRotation;v&&(f.envMap.value=v,Li.copy(x),Li.x*=-1,Li.y*=-1,Li.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),f.envMapRotation.value.setFromMatrix4(rg.makeRotationFromEuler(Li)),f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function c(f,p,w,v){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*w,f.scale.value=v*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function l(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function d(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function m(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function u(f,p,w){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===dn&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=w.texture,f.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function g(f,p){const w=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(w.matrixWorld),f.nearDistance.value=w.shadow.camera.near,f.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function og(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,v){const x=v.program;n.uniformBlockBinding(w,x)}function l(w,v){let x=i[w.id];x===void 0&&(_(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",f));const A=v.program;n.updateUBOMapping(w,A);const E=t.render.frame;r[w.id]!==E&&(m(w),r[w.id]=E)}function h(w){const v=d();w.__bindingPointIndex=v;const x=s.createBuffer(),A=w.__size,E=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,A,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(w){const v=i[w.id],x=w.uniforms,A=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let E=0,C=x.length;E<C;E++){const I=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,S=I.length;y<S;y++){const D=I[y];if(u(D,E,y,A)===!0){const N=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let B=0;B<k.length;B++){const Y=k[B],nt=g(Y);typeof Y=="number"||typeof Y=="boolean"?(D.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,N+K,D.__data)):Y.isMatrix3?(D.__data[0]=Y.elements[0],D.__data[1]=Y.elements[1],D.__data[2]=Y.elements[2],D.__data[3]=0,D.__data[4]=Y.elements[3],D.__data[5]=Y.elements[4],D.__data[6]=Y.elements[5],D.__data[7]=0,D.__data[8]=Y.elements[6],D.__data[9]=Y.elements[7],D.__data[10]=Y.elements[8],D.__data[11]=0):(Y.toArray(D.__data,K),K+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function u(w,v,x,A){const E=w.value,C=v+"_"+x;if(A[C]===void 0)return typeof E=="number"||typeof E=="boolean"?A[C]=E:A[C]=E.clone(),!0;{const I=A[C];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return A[C]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function _(w){const v=w.uniforms;let x=0;const A=16;for(let C=0,I=v.length;C<I;C++){const y=Array.isArray(v[C])?v[C]:[v[C]];for(let S=0,D=y.length;S<D;S++){const N=y[S],k=Array.isArray(N.value)?N.value:[N.value];for(let K=0,B=k.length;K<B;K++){const Y=k[K],nt=g(Y),W=x%A,ut=W%nt.boundary,j=W+ut;x+=ut,j!==0&&A-j<nt.storage&&(x+=A-j),N.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=nt.storage}}}const E=x%A;return E>0&&(x+=A-E),w.__size=x,w.__cache={},this}function g(w){const v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=48,v.storage=48):w.isMatrix4?(v.boundary=64,v.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),v}function f(w){const v=w.target;v.removeEventListener("dispose",f);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(const w in i)s.deleteBuffer(i[w]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}class lg{constructor(t={}){const{canvas:e=Fu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;const _=new Uint32Array(4),g=new Int32Array(4);let f=null,p=null;const w=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=qe;let E=0,C=0,I=null,y=-1,S=null;const D=new Re,N=new Re;let k=null;const K=new ee(0);let B=0,Y=e.width,nt=e.height,W=1,ut=null,j=null;const gt=new Re(0,0,Y,nt),It=new Re(0,0,Y,nt);let jt=!1;const re=new pl;let $t=!1,Z=!1;const st=new me,bt=new T,Ht=new Re,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ne=!1;function Ne(){return I===null?W:1}let P=n;function Ee(b,F){return e.getContext(b,F)}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${el}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",ot,!1),P===null){const F="webgl2";if(P=Ee(F,b),P===null)throw Ee(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Zt,Gt,Tt,he,St,ie,Be,De,R,M,O,$,tt,J,zt,ht,Dt,Ct,at,vt,qt,Ut,_t,Qt;function L(){Zt=new v0(P),Zt.init(),Ut=new tg(P,Zt),Gt=new u0(P,Zt,t,Ut),Tt=new Jm(P,Zt),Gt.reversedDepthBuffer&&m&&Tt.buffers.depth.setReversed(!0),he=new S0(P),St=new Bm,ie=new Qm(P,Zt,Tt,St,Gt,Ut,he),Be=new f0(x),De=new _0(x),R=new Td(P),_t=new c0(P,R),M=new x0(P,R,he,_t),O=new w0(P,M,R,he),at=new y0(P,Gt,ie),ht=new d0(St),$=new Om(x,Be,De,Zt,Gt,_t,ht),tt=new ag(x,St),J=new Hm,zt=new Ym(Zt),Ct=new l0(x,Be,De,Tt,O,u,c),Dt=new Zm(x,O,Gt),Qt=new og(P,he,Gt,Tt),vt=new h0(P,Zt,he),qt=new M0(P,Zt,he),he.programs=$.programs,x.capabilities=Gt,x.extensions=Zt,x.properties=St,x.renderLists=J,x.shadowMap=Dt,x.state=Tt,x.info=he}L();const rt=new sg(x,P);this.xr=rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=Zt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Zt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(Y,nt,!1))},this.getSize=function(b){return b.set(Y,nt)},this.setSize=function(b,F,V=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=b,nt=F,e.width=Math.floor(b*W),e.height=Math.floor(F*W),V===!0&&(e.style.width=b+"px",e.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(Y*W,nt*W).floor()},this.setDrawingBufferSize=function(b,F,V){Y=b,nt=F,W=V,e.width=Math.floor(b*V),e.height=Math.floor(F*V),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(gt)},this.setViewport=function(b,F,V,G){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,F,V,G),Tt.viewport(D.copy(gt).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(It)},this.setScissor=function(b,F,V,G){b.isVector4?It.set(b.x,b.y,b.z,b.w):It.set(b,F,V,G),Tt.scissor(N.copy(It).multiplyScalar(W).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(b){Tt.setScissorTest(jt=b)},this.setOpaqueSort=function(b){ut=b},this.setTransparentSort=function(b){j=b},this.getClearColor=function(b){return b.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,V=!0){let G=0;if(b){let z=!1;if(I!==null){const lt=I.texture.format;z=lt===cl||lt===ll||lt===ol}if(z){const lt=I.texture.type,mt=lt===qn||lt===Hi||lt===tr||lt===er||lt===sl||lt===rl,At=Ct.getClearColor(),pt=Ct.getClearAlpha(),Wt=At.r,Xt=At.g,Ot=At.b;mt?(_[0]=Wt,_[1]=Xt,_[2]=Ot,_[3]=pt,P.clearBufferuiv(P.COLOR,0,_)):(g[0]=Wt,g[1]=Xt,g[2]=Ot,g[3]=pt,P.clearBufferiv(P.COLOR,0,g))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),V&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),Ct.dispose(),J.dispose(),zt.dispose(),St.dispose(),Be.dispose(),De.dispose(),O.dispose(),_t.dispose(),Qt.dispose(),$.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",wn),rt.removeEventListener("sessionend",hr),In.stop()};function ft(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=he.autoReset,F=Dt.enabled,V=Dt.autoUpdate,G=Dt.needsUpdate,z=Dt.type;L(),he.autoReset=b,Dt.enabled=F,Dt.autoUpdate=V,Dt.needsUpdate=G,Dt.type=z}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function et(b){const F=b.target;F.removeEventListener("dispose",et),Pt(F)}function Pt(b){Jt(b),St.remove(b)}function Jt(b){const F=St.get(b).programs;F!==void 0&&(F.forEach(function(V){$.releaseProgram(V)}),b.isShaderMaterial&&$.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,V,G,z,lt){F===null&&(F=Ft);const mt=z.isMesh&&z.matrixWorld.determinant()<0,At=pr(b,F,V,G,z);Tt.setMaterial(G,mt);let pt=V.index,Wt=1;if(G.wireframe===!0){if(pt=M.getWireframeAttribute(V),pt===void 0)return;Wt=2}const Xt=V.drawRange,Ot=V.attributes.position;let Yt=Xt.start*Wt,ge=(Xt.start+Xt.count)*Wt;lt!==null&&(Yt=Math.max(Yt,lt.start*Wt),ge=Math.min(ge,(lt.start+lt.count)*Wt)),pt!==null?(Yt=Math.max(Yt,0),ge=Math.min(ge,pt.count)):Ot!=null&&(Yt=Math.max(Yt,0),ge=Math.min(ge,Ot.count));const Fe=ge-Yt;if(Fe<0||Fe===1/0)return;_t.setup(z,G,At,V,pt);let ce,Kt=vt;if(pt!==null&&(ce=R.get(pt),Kt=qt,Kt.setIndex(ce)),z.isMesh)G.wireframe===!0?(Tt.setLineWidth(G.wireframeLinewidth*Ne()),Kt.setMode(P.LINES)):Kt.setMode(P.TRIANGLES);else if(z.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),Tt.setLineWidth(Lt*Ne()),z.isLineSegments?Kt.setMode(P.LINES):z.isLineLoop?Kt.setMode(P.LINE_LOOP):Kt.setMode(P.LINE_STRIP)}else z.isPoints?Kt.setMode(P.POINTS):z.isSprite&&Kt.setMode(P.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)sr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Kt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))Kt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Lt=z._multiDrawStarts,Ie=z._multiDrawCounts,le=z._multiDrawCount,Ve=pt?R.get(pt).bytesPerElement:1,kn=St.get(G).currentProgram.getUniforms();for(let on=0;on<le;on++)kn.setValue(P,"_gl_DrawID",on),Kt.render(Lt[on]/Ve,Ie[on])}else if(z.isInstancedMesh)Kt.renderInstances(Yt,Fe,z.count);else if(V.isInstancedBufferGeometry){const Lt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ie=Math.min(V.instanceCount,Lt);Kt.renderInstances(Yt,Fe,Ie)}else Kt.render(Yt,Fe)};function ve(b,F,V){b.transparent===!0&&b.side===sn&&b.forceSinglePass===!1?(b.side=dn,b.needsUpdate=!0,Ti(b,F,V),b.side=Si,b.needsUpdate=!0,Ti(b,F,V),b.side=sn):Ti(b,F,V)}this.compile=function(b,F,V=null){V===null&&(V=b),p=zt.get(V),p.init(F),v.push(p),V.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),b!==V&&b.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const G=new Set;return b.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const lt=z.material;if(lt)if(Array.isArray(lt))for(let mt=0;mt<lt.length;mt++){const At=lt[mt];ve(At,V,z),G.add(At)}else ve(lt,V,z),G.add(lt)}),p=v.pop(),G},this.compileAsync=function(b,F,V=null){const G=this.compile(b,F,V);return new Promise(z=>{function lt(){if(G.forEach(function(mt){St.get(mt).currentProgram.isReady()&&G.delete(mt)}),G.size===0){z(b);return}setTimeout(lt,10)}Zt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ue=null;function Te(b){ue&&ue(b)}function wn(){In.stop()}function hr(){In.start()}const In=new Ah;In.setAnimationLoop(Te),typeof self<"u"&&In.setContext(self),this.setAnimationLoop=function(b){ue=b,rt.setAnimationLoop(b),b===null?In.stop():In.start()},rt.addEventListener("sessionstart",wn),rt.addEventListener("sessionend",hr),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(F),F=rt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,F,I),p=zt.get(b,v.length),p.init(F),v.push(p),st.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),re.setFromProjectionMatrix(st,Wn,F.reversedDepth),Z=this.localClippingEnabled,$t=ht.init(this.clippingPlanes,Z),f=J.get(b,w.length),f.init(),w.push(f),rt.enabled===!0&&rt.isPresenting===!0){const lt=x.xr.getDepthSensingMesh();lt!==null&&Ls(lt,F,-1/0,x.sortObjects)}Ls(b,F,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(ut,j),ne=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,ne&&Ct.addToRenderList(f,b),this.info.render.frame++,$t===!0&&ht.beginShadows();const V=p.state.shadowsArray;Dt.render(V,b,F),$t===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=f.opaque,z=f.transmissive;if(p.setupLights(),F.isArrayCamera){const lt=F.cameras;if(z.length>0)for(let mt=0,At=lt.length;mt<At;mt++){const pt=lt[mt];Us(G,z,b,pt)}ne&&Ct.render(b);for(let mt=0,At=lt.length;mt<At;mt++){const pt=lt[mt];ur(f,b,pt,pt.viewport)}}else z.length>0&&Us(G,z,b,F),ne&&Ct.render(b),ur(f,b,F);I!==null&&C===0&&(ie.updateMultisampleRenderTarget(I),ie.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(x,b,F),_t.resetDefaultState(),y=-1,S=null,v.pop(),v.length>0?(p=v[v.length-1],$t===!0&&ht.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?f=w[w.length-1]:f=null};function Ls(b,F,V,G){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||re.intersectsSprite(b)){G&&Ht.setFromMatrixPosition(b.matrixWorld).applyMatrix4(st);const mt=O.update(b),At=b.material;At.visible&&f.push(b,mt,At,V,Ht.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||re.intersectsObject(b))){const mt=O.update(b),At=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ht.copy(b.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ht.copy(mt.boundingSphere.center)),Ht.applyMatrix4(b.matrixWorld).applyMatrix4(st)),Array.isArray(At)){const pt=mt.groups;for(let Wt=0,Xt=pt.length;Wt<Xt;Wt++){const Ot=pt[Wt],Yt=At[Ot.materialIndex];Yt&&Yt.visible&&f.push(b,mt,Yt,V,Ht.z,Ot)}}else At.visible&&f.push(b,mt,At,V,Ht.z,null)}}const lt=b.children;for(let mt=0,At=lt.length;mt<At;mt++)Ls(lt[mt],F,V,G)}function ur(b,F,V,G){const z=b.opaque,lt=b.transmissive,mt=b.transparent;p.setupLightsView(V),$t===!0&&ht.setGlobalState(x.clippingPlanes,V),G&&Tt.viewport(D.copy(G)),z.length>0&&Yn(z,F,V),lt.length>0&&Yn(lt,F,V),mt.length>0&&Yn(mt,F,V),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Us(b,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Pn(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?Xn:qn,minFilter:Bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const lt=p.state.transmissionRenderTarget[G.id],mt=G.viewport||D;lt.setSize(mt.z*x.transmissionResolutionScale,mt.w*x.transmissionResolutionScale);const At=x.getRenderTarget(),pt=x.getActiveCubeFace(),Wt=x.getActiveMipmapLevel();x.setRenderTarget(lt),x.getClearColor(K),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),x.clear(),ne&&Ct.render(V);const Xt=x.toneMapping;x.toneMapping=xi;const Ot=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),$t===!0&&ht.setGlobalState(x.clippingPlanes,G),Yn(b,V,G),ie.updateMultisampleRenderTarget(lt),ie.updateRenderTargetMipmap(lt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let ge=0,Fe=F.length;ge<Fe;ge++){const ce=F[ge],Kt=ce.object,Lt=ce.geometry,Ie=ce.material,le=ce.group;if(Ie.side===sn&&Kt.layers.test(G.layers)){const Ve=Ie.side;Ie.side=dn,Ie.needsUpdate=!0,dr(Kt,V,G,Lt,Ie,le),Ie.side=Ve,Ie.needsUpdate=!0,Yt=!0}}Yt===!0&&(ie.updateMultisampleRenderTarget(lt),ie.updateRenderTargetMipmap(lt))}x.setRenderTarget(At,pt,Wt),x.setClearColor(K,B),Ot!==void 0&&(G.viewport=Ot),x.toneMapping=Xt}function Yn(b,F,V){const G=F.isScene===!0?F.overrideMaterial:null;for(let z=0,lt=b.length;z<lt;z++){const mt=b[z],At=mt.object,pt=mt.geometry,Wt=mt.group;let Xt=mt.material;Xt.allowOverride===!0&&G!==null&&(Xt=G),At.layers.test(V.layers)&&dr(At,F,V,pt,Xt,Wt)}}function dr(b,F,V,G,z,lt){b.onBeforeRender(x,F,V,G,z,lt),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),z.onBeforeRender(x,F,V,G,b,lt),z.transparent===!0&&z.side===sn&&z.forceSinglePass===!1?(z.side=dn,z.needsUpdate=!0,x.renderBufferDirect(V,F,G,z,b,lt),z.side=Si,z.needsUpdate=!0,x.renderBufferDirect(V,F,G,z,b,lt),z.side=sn):x.renderBufferDirect(V,F,G,z,b,lt),b.onAfterRender(x,F,V,G,z,lt)}function Ti(b,F,V){F.isScene!==!0&&(F=Ft);const G=St.get(b),z=p.state.lights,lt=p.state.shadowsArray,mt=z.state.version,At=$.getParameters(b,z.state,lt,F,V),pt=$.getProgramCacheKey(At);let Wt=G.programs;G.environment=b.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(b.isMeshStandardMaterial?De:Be).get(b.envMap||G.environment),G.envMapRotation=G.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Wt===void 0&&(b.addEventListener("dispose",et),Wt=new Map,G.programs=Wt);let Xt=Wt.get(pt);if(Xt!==void 0){if(G.currentProgram===Xt&&G.lightsStateVersion===mt)return ai(b,At),Xt}else At.uniforms=$.getUniforms(b),b.onBeforeCompile(At,x),Xt=$.acquireProgram(At,pt),Wt.set(pt,Xt),G.uniforms=At.uniforms;const Ot=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ot.clippingPlanes=ht.uniform),ai(b,At),G.needsLights=Ns(b),G.lightsStateVersion=mt,G.needsLights&&(Ot.ambientLightColor.value=z.state.ambient,Ot.lightProbe.value=z.state.probe,Ot.directionalLights.value=z.state.directional,Ot.directionalLightShadows.value=z.state.directionalShadow,Ot.spotLights.value=z.state.spot,Ot.spotLightShadows.value=z.state.spotShadow,Ot.rectAreaLights.value=z.state.rectArea,Ot.ltc_1.value=z.state.rectAreaLTC1,Ot.ltc_2.value=z.state.rectAreaLTC2,Ot.pointLights.value=z.state.point,Ot.pointLightShadows.value=z.state.pointShadow,Ot.hemisphereLights.value=z.state.hemi,Ot.directionalShadowMap.value=z.state.directionalShadowMap,Ot.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ot.spotShadowMap.value=z.state.spotShadowMap,Ot.spotLightMatrix.value=z.state.spotLightMatrix,Ot.spotLightMap.value=z.state.spotLightMap,Ot.pointShadowMap.value=z.state.pointShadowMap,Ot.pointShadowMatrix.value=z.state.pointShadowMatrix),G.currentProgram=Xt,G.uniformsList=null,Xt}function fr(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=ea.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function ai(b,F){const V=St.get(b);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function pr(b,F,V,G,z){F.isScene!==!0&&(F=Ft),ie.resetTextureUnits();const lt=F.fog,mt=G.isMeshStandardMaterial?F.environment:null,At=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ys,pt=(G.isMeshStandardMaterial?De:Be).get(G.envMap||mt),Wt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ot=!!V.morphAttributes.position,Yt=!!V.morphAttributes.normal,ge=!!V.morphAttributes.color;let Fe=xi;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Fe=x.toneMapping);const ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Kt=ce!==void 0?ce.length:0,Lt=St.get(G),Ie=p.state.lights;if($t===!0&&(Z===!0||b!==S)){const H=b===S&&G.id===y;ht.setState(G,b,H)}let le=!1;G.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Ie.state.version||Lt.outputColorSpace!==At||z.isBatchedMesh&&Lt.batching===!1||!z.isBatchedMesh&&Lt.batching===!0||z.isBatchedMesh&&Lt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Lt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Lt.instancing===!1||!z.isInstancedMesh&&Lt.instancing===!0||z.isSkinnedMesh&&Lt.skinning===!1||!z.isSkinnedMesh&&Lt.skinning===!0||z.isInstancedMesh&&Lt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Lt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Lt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Lt.instancingMorph===!1&&z.morphTexture!==null||Lt.envMap!==pt||G.fog===!0&&Lt.fog!==lt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==ht.numPlanes||Lt.numIntersection!==ht.numIntersection)||Lt.vertexAlphas!==Wt||Lt.vertexTangents!==Xt||Lt.morphTargets!==Ot||Lt.morphNormals!==Yt||Lt.morphColors!==ge||Lt.toneMapping!==Fe||Lt.morphTargetsCount!==Kt)&&(le=!0):(le=!0,Lt.__version=G.version);let Ve=Lt.currentProgram;le===!0&&(Ve=Ti(G,F,z));let kn=!1,on=!1,Ai=!1;const Le=Ve.getUniforms(),U=Lt.uniforms;if(Tt.useProgram(Ve.program)&&(kn=!0,on=!0,Ai=!0),G.id!==y&&(y=G.id,on=!0),kn||S!==b){Tt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Le.setValue(P,"projectionMatrix",b.projectionMatrix),Le.setValue(P,"viewMatrix",b.matrixWorldInverse);const q=Le.map.cameraPosition;q!==void 0&&q.setValue(P,bt.setFromMatrixPosition(b.matrixWorld)),Gt.logarithmicDepthBuffer&&Le.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Le.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,on=!0,Ai=!0)}if(z.isSkinnedMesh){Le.setOptional(P,z,"bindMatrix"),Le.setOptional(P,z,"bindMatrixInverse");const H=z.skeleton;H&&(H.boneTexture===null&&H.computeBoneTexture(),Le.setValue(P,"boneTexture",H.boneTexture,ie))}z.isBatchedMesh&&(Le.setOptional(P,z,"batchingTexture"),Le.setValue(P,"batchingTexture",z._matricesTexture,ie),Le.setOptional(P,z,"batchingIdTexture"),Le.setValue(P,"batchingIdTexture",z._indirectTexture,ie),Le.setOptional(P,z,"batchingColorTexture"),z._colorsTexture!==null&&Le.setValue(P,"batchingColorTexture",z._colorsTexture,ie));const X=V.morphAttributes;if((X.position!==void 0||X.normal!==void 0||X.color!==void 0)&&at.update(z,V,Ve),(on||Lt.receiveShadow!==z.receiveShadow)&&(Lt.receiveShadow=z.receiveShadow,Le.setValue(P,"receiveShadow",z.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(U.envMap.value=pt,U.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(U.envMapIntensity.value=F.environmentIntensity),on&&(Le.setValue(P,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Xi(U,Ai),lt&&G.fog===!0&&tt.refreshFogUniforms(U,lt),tt.refreshMaterialUniforms(U,G,W,nt,p.state.transmissionRenderTarget[b.id]),ea.upload(P,fr(Lt),U,ie)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ea.upload(P,fr(Lt),U,ie),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Le.setValue(P,"center",z.center),Le.setValue(P,"modelViewMatrix",z.modelViewMatrix),Le.setValue(P,"normalMatrix",z.normalMatrix),Le.setValue(P,"modelMatrix",z.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const H=G.uniformsGroups;for(let q=0,it=H.length;q<it;q++){const Mt=H[q];Qt.update(Mt,Ve),Qt.bind(Mt,Ve)}}return Ve}function Xi(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Ns(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,F,V){const G=St.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),St.get(b.texture).__webglTexture=F,St.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const V=St.get(b);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};const qi=P.createFramebuffer();this.setRenderTarget=function(b,F=0,V=0){I=b,E=F,C=V;let G=!0,z=null,lt=!1,mt=!1;if(b){const pt=St.get(b);if(pt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(pt.__webglFramebuffer===void 0)ie.setupRenderTarget(b);else if(pt.__hasExternalTextures)ie.rebindTextures(b,St.get(b.texture).__webglTexture,St.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ot=b.depthTexture;if(pt.__boundDepthTexture!==Ot){if(Ot!==null&&St.has(Ot)&&(b.width!==Ot.image.width||b.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(b)}}const Wt=b.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(mt=!0);const Xt=St.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xt[F])?z=Xt[F][V]:z=Xt[F],lt=!0):b.samples>0&&ie.useMultisampledRTT(b)===!1?z=St.get(b).__webglMultisampledFramebuffer:Array.isArray(Xt)?z=Xt[V]:z=Xt,D.copy(b.viewport),N.copy(b.scissor),k=b.scissorTest}else D.copy(gt).multiplyScalar(W).floor(),N.copy(It).multiplyScalar(W).floor(),k=jt;if(V!==0&&(z=qi),Tt.bindFramebuffer(P.FRAMEBUFFER,z)&&G&&Tt.drawBuffers(b,z),Tt.viewport(D),Tt.scissor(N),Tt.setScissorTest(k),lt){const pt=St.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,pt.__webglTexture,V)}else if(mt){const pt=F;for(let Wt=0;Wt<b.textures.length;Wt++){const Xt=St.get(b.textures[Wt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Wt,Xt.__webglTexture,V,pt)}}else if(b!==null&&V!==0){const pt=St.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pt.__webglTexture,V)}y=-1},this.readRenderTargetPixels=function(b,F,V,G,z,lt,mt,At=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=St.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&mt!==void 0&&(pt=pt[mt]),pt){Tt.bindFramebuffer(P.FRAMEBUFFER,pt);try{const Wt=b.textures[At],Xt=Wt.format,Ot=Wt.type;if(!Gt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-G&&V>=0&&V<=b.height-z&&(b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+At),P.readPixels(F,V,G,z,Ut.convert(Xt),Ut.convert(Ot),lt))}finally{const Wt=I!==null?St.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(P.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(b,F,V,G,z,lt,mt,At=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=St.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&mt!==void 0&&(pt=pt[mt]),pt)if(F>=0&&F<=b.width-G&&V>=0&&V<=b.height-z){Tt.bindFramebuffer(P.FRAMEBUFFER,pt);const Wt=b.textures[At],Xt=Wt.format,Ot=Wt.type;if(!Gt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Yt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Yt),P.bufferData(P.PIXEL_PACK_BUFFER,lt.byteLength,P.STREAM_READ),b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+At),P.readPixels(F,V,G,z,Ut.convert(Xt),Ut.convert(Ot),0);const ge=I!==null?St.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(P.FRAMEBUFFER,ge);const Fe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await zu(P,Fe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Yt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,lt),P.deleteBuffer(Yt),P.deleteSync(Fe),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,V=0){const G=Math.pow(2,-V),z=Math.floor(b.image.width*G),lt=Math.floor(b.image.height*G),mt=F!==null?F.x:0,At=F!==null?F.y:0;ie.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,mt,At,z,lt),Tt.unbindTexture()};const ga=P.createFramebuffer(),_a=P.createFramebuffer();this.copyTextureToTexture=function(b,F,V=null,G=null,z=0,lt=null){lt===null&&(z!==0?(sr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=z,z=0):lt=0);let mt,At,pt,Wt,Xt,Ot,Yt,ge,Fe;const ce=b.isCompressedTexture?b.mipmaps[lt]:b.image;if(V!==null)mt=V.max.x-V.min.x,At=V.max.y-V.min.y,pt=V.isBox3?V.max.z-V.min.z:1,Wt=V.min.x,Xt=V.min.y,Ot=V.isBox3?V.min.z:0;else{const X=Math.pow(2,-z);mt=Math.floor(ce.width*X),At=Math.floor(ce.height*X),b.isDataArrayTexture?pt=ce.depth:b.isData3DTexture?pt=Math.floor(ce.depth*X):pt=1,Wt=0,Xt=0,Ot=0}G!==null?(Yt=G.x,ge=G.y,Fe=G.z):(Yt=0,ge=0,Fe=0);const Kt=Ut.convert(F.format),Lt=Ut.convert(F.type);let Ie;F.isData3DTexture?(ie.setTexture3D(F,0),Ie=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ie.setTexture2DArray(F,0),Ie=P.TEXTURE_2D_ARRAY):(ie.setTexture2D(F,0),Ie=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const le=P.getParameter(P.UNPACK_ROW_LENGTH),Ve=P.getParameter(P.UNPACK_IMAGE_HEIGHT),kn=P.getParameter(P.UNPACK_SKIP_PIXELS),on=P.getParameter(P.UNPACK_SKIP_ROWS),Ai=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ce.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ce.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ot);const Le=b.isDataArrayTexture||b.isData3DTexture,U=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const X=St.get(b),H=St.get(F),q=St.get(X.__renderTarget),it=St.get(H.__renderTarget);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,q.__webglFramebuffer),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,it.__webglFramebuffer);for(let Mt=0;Mt<pt;Mt++)Le&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.get(b).__webglTexture,z,Ot+Mt),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.get(F).__webglTexture,lt,Fe+Mt)),P.blitFramebuffer(Wt,Xt,mt,At,Yt,ge,mt,At,P.DEPTH_BUFFER_BIT,P.NEAREST);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(z!==0||b.isRenderTargetTexture||St.has(b)){const X=St.get(b),H=St.get(F);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,ga),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,_a);for(let q=0;q<pt;q++)Le?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,X.__webglTexture,z,Ot+q):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,X.__webglTexture,z),U?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,H.__webglTexture,lt,Fe+q):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,H.__webglTexture,lt),z!==0?P.blitFramebuffer(Wt,Xt,mt,At,Yt,ge,mt,At,P.COLOR_BUFFER_BIT,P.NEAREST):U?P.copyTexSubImage3D(Ie,lt,Yt,ge,Fe+q,Wt,Xt,mt,At):P.copyTexSubImage2D(Ie,lt,Yt,ge,Wt,Xt,mt,At);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else U?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(Ie,lt,Yt,ge,Fe,mt,At,pt,Kt,Lt,ce.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(Ie,lt,Yt,ge,Fe,mt,At,pt,Kt,ce.data):P.texSubImage3D(Ie,lt,Yt,ge,Fe,mt,At,pt,Kt,Lt,ce):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,lt,Yt,ge,mt,At,Kt,Lt,ce.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,lt,Yt,ge,ce.width,ce.height,Kt,ce.data):P.texSubImage2D(P.TEXTURE_2D,lt,Yt,ge,mt,At,Kt,Lt,ce);P.pixelStorei(P.UNPACK_ROW_LENGTH,le),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ve),P.pixelStorei(P.UNPACK_SKIP_PIXELS,kn),P.pixelStorei(P.UNPACK_SKIP_ROWS,on),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ai),lt===0&&F.generateMipmaps&&P.generateMipmap(Ie),Tt.unbindTexture()},this.initRenderTarget=function(b){St.get(b).__webglFramebuffer===void 0&&ie.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ie.setTextureCube(b,0):b.isData3DTexture?ie.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ie.setTexture2DArray(b,0):ie.setTexture2D(b,0),Tt.unbindTexture()},this.resetState=function(){E=0,C=0,I=null,Tt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}const na={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ps{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cg=new Ml(-1,1,1,-1,0,1);class hg extends He{constructor(){super(),this.setAttribute("position",new be([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new be([0,2,0,0,2,0],2))}}const ug=new hg;class yl{constructor(t){this._mesh=new dt(ug,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,cg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Dh extends Ps{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Qe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=rr.clone(t.uniforms),this.material=new Qe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new yl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Nc extends Ps{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class dg extends Ps{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class fg{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Rt);this._width=n.width,this._height=n.height,e=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Dh(na),this.copyPass.material.blending=ni,this.clock=new Eh}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Nc!==void 0&&(a instanceof Nc?n=!0:a instanceof dg&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pg extends Ps{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ee}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}}const mg={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ee(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ts extends Ps{constructor(t,e=1,n,i){super(),this.strength=e,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new Rt(t.x,t.y):new Rt(256,256),this.clearColor=new ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(r,a,{type:Xn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Pn(r,a,{type:Xn});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const m=new Pn(r,a,{type:Xn});m.texture.name="UnrealBloomPass.v"+h,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}const o=mg;this.highPassUniforms=rr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Qe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Rt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=rr.clone(na.uniforms),this.blendMaterial=new Qe({uniforms:this.copyUniforms,vertexShader:na.vertexShader,fragmentShader:na.fragmentShader,blending:xn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ee,this._oldClearAlpha=1,this._basic=new Mi,this._fsQuad=new yl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Rt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ts.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ts.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Qe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Rt(.5,.5)},direction:{value:new Rt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Qe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ts.BlurDirectionX=new Rt(1,0);Ts.BlurDirectionY=new Rt(0,1);const Yr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class gg extends Ps{constructor(){super(),this.uniforms=rr.clone(Yr.uniforms),this.material=new gd({name:Yr.name,uniforms:this.uniforms,vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader}),this._fsQuad=new yl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},de.getTransfer(this._outputColorSpace)===xe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Kc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Zc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===$c&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const js=new T;function Tn(s,t,e,n,i,r){const a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;js.copy(t),js[n]=0,js.normalize();const l=.5*a/(a+o),h=1-js.angleTo(s)/c;return Math.sign(js[e])===1?h*l:o/(a+o)+l+l*(1-h)}class pe extends yt{constructor(t=1,e=1,n=1,i=2,r=.1){const a=i*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:i,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new T,l=new T,h=new T(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,m=this.attributes.normal.array,u=this.attributes.uv.array,_=d.length/6,g=new T,f=.5/a;for(let p=0,w=0;p<d.length;p+=3,w+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*f,l.y-=Math.sign(l.y)*f,l.z-=Math.sign(l.z)*f,l.normalize(),d[p+0]=h.x*Math.sign(c.x)+l.x*r,d[p+1]=h.y*Math.sign(c.y)+l.y*r,d[p+2]=h.z*Math.sign(c.z)+l.z*r,m[p+0]=l.x,m[p+1]=l.y,m[p+2]=l.z,Math.floor(p/_)){case 0:g.set(1,0,0),u[w+0]=Tn(g,l,"z","y",r,n),u[w+1]=1-Tn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),u[w+0]=1-Tn(g,l,"z","y",r,n),u[w+1]=1-Tn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),u[w+0]=1-Tn(g,l,"x","z",r,t),u[w+1]=Tn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),u[w+0]=1-Tn(g,l,"x","z",r,t),u[w+1]=1-Tn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),u[w+0]=1-Tn(g,l,"x","y",r,t),u[w+1]=1-Tn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),u[w+0]=Tn(g,l,"x","y",r,t),u[w+1]=1-Tn(g,l,"y","x",r,e);break}}static fromJSON(t){return new pe(t.width,t.height,t.depth,t.segments,t.radius)}}function ri(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class wi{constructor(t,e=5,n=3){this.layers=[];const i=ri(t);for(let r=0;r<e;r++){const a=n*Math.pow(2,r),o=new Float32Array(a*a);for(let c=0;c<o.length;c++)o[c]=i();this.layers.push({size:a,grid:o,amp:Math.pow(.5,r)})}this.total=this.layers.reduce((r,a)=>r+a.amp,0),this.rand=i}sample(t,e){let n=0;for(const i of this.layers){const{size:r,grid:a,amp:o}=i,c=t*r,l=e*r,h=Math.floor(c),d=Math.floor(l),m=c-h,u=l-d,_=m*m*(3-2*m),g=u*u*(3-2*u),f=(h%r+r)%r,p=(d%r+r)%r,w=(f+1)%r,v=(p+1)%r,x=a[p*r+f],A=a[p*r+w],E=a[v*r+f],C=a[v*r+w],I=x+(A-x)*_,y=E+(C-E)*_;n+=(I+(y-I)*g)*o}return n/this.total}}let Vi=null;function _g(s){Vi=s}function mn(s){const t=document.createElement("canvas");return t.width=s,t.height=s,t}function Is(s,{repeat:t=1,srgb:e=!1,aniso:n=8}={}){const i=new Ei(s);return i.wrapS=yi,i.wrapT=yi,i.repeat.set(t,t),i.colorSpace=e?qe:Rn,i.anisotropy=Math.min(n,Vi?Vi.capabilities.getMaxAnisotropy():8),i.needsUpdate=!0,i}function Ds(s,t,e,n=2.2){const i=mn(t),r=i.getContext("2d"),a=r.createImageData(t,e),o=a.data;for(let l=0;l<e;l++){const h=(l-1+e)%e*t,d=(l+1)%e*t,m=l*t;for(let u=0;u<t;u++){const _=(u-1+t)%t,g=(u+1)%t,f=(s[m+g]-s[m+_])*n,p=(s[d+u]-s[h+u])*n,w=-f,v=-p,x=1,A=Math.hypot(w,v,x)||1,E=(m+u)*4;o[E]=(w/A*.5+.5)*255,o[E+1]=(v/A*.5+.5)*255,o[E+2]=(x/A*.5+.5)*255,o[E+3]=255}}r.putImageData(a,0,0);const c=new Ei(i);return c.wrapS=c.wrapT=yi,c.colorSpace=Rn,c.anisotropy=Math.min(8,Vi?Vi.capabilities.getMaxAnisotropy():8),c}function pa(s,t,e,n=!1){const i=mn(t),r=i.getContext("2d"),a=r.createImageData(t,e);for(let c=0;c<t*e;c++){let l=s[c];n&&(l=1-l);const h=Math.max(0,Math.min(255,l*255));a.data[c*4]=h,a.data[c*4+1]=h,a.data[c*4+2]=h,a.data[c*4+3]=255}r.putImageData(a,0,0);const o=new Ei(i);return o.wrapS=o.wrapT=yi,o.colorSpace=Rn,o.anisotropy=Math.min(8,Vi?Vi.capabilities.getMaxAnisotropy():8),o}function vg(){const t=new wi(101,5,3),e=new wi(202,3,8),n=ri(77),i=mn(512),r=i.getContext("2d"),a=r.createImageData(512,512),o=new Float32Array(512*512);for(let c=0;c<512;c++)for(let l=0;l<512;l++){const h=l/512,d=c/512,m=e.sample(h,d),u=t.sample(h,d),_=Math.sin((h*9+d*5+u*2.4)*Math.PI*2)*.5+.5;let g=u*.55+m*.28+_*.17;const f=m>.78&&e.sample(h*2.1,d*2.1)>.7;let p=172+u*32+m*22,w=151+u*28+m*21,v=120+u*24+m*18;f&&(p-=38,w-=34,v-=28,g+=.16);const x=n();x>.994&&(p+=34,w+=30,v+=24,g+=.2),x<.006&&(p-=42,w-=38,v-=30);const A=(c*512+l)*4;a.data[A]=Math.max(0,Math.min(255,p)),a.data[A+1]=Math.max(0,Math.min(255,w)),a.data[A+2]=Math.max(0,Math.min(255,v)),a.data[A+3]=255,o[c*512+l]=g}r.putImageData(a,0,0),r.globalAlpha=.16,r.strokeStyle="#6b5c45",r.lineWidth=1.2;for(let c=0;c<26;c++){r.beginPath();let l=n()*512,h=n()*512;r.moveTo(l,h);for(let d=0;d<3;d++)l+=(n()-.5)*90,h+=(n()-.5)*40,r.lineTo(l,h);r.stroke()}return r.globalAlpha=1,{map:Is(i,{repeat:1,srgb:!0}),normalMap:Ds(o,512,512,3.2),roughnessMap:pa(o,512,512,!1)}}function xg(){const t=new wi(311,5,2),e=new wi(412,4,6),n=ri(933),i=mn(512),r=i.getContext("2d"),a=r.createImageData(512,512),o=new Float32Array(512*512);for(let _=0;_<512;_++)for(let g=0;g<512;g++){const f=g/512,p=_/512,w=t.sample(f,p),v=e.sample(f,p),x=Math.max(0,t.sample(f*.7+.2,p*.7+.1)-.5)*.7,A=Math.max(0,Math.sin(p*22+w*6)-.86)*.25;let E=116+w*42+v*17;E-=x*36+A*30;const C=n()*12-6;let I=E+9+C,y=E+6+C,S=E+2+C;e.sample(f*3.1,p*3.1)>.8&&(I+=14,y+=13,S+=11);const N=.5+v*.3-x*.2,k=(_*512+g)*4;a.data[k]=Math.max(0,Math.min(255,I)),a.data[k+1]=Math.max(0,Math.min(255,y)),a.data[k+2]=Math.max(0,Math.min(255,S)),a.data[k+3]=255,o[_*512+g]=N}r.putImageData(a,0,0);const c=mn(512),l=c.getContext("2d"),h=l.createImageData(512,512);for(let _=0;_<512*512;_++){const g=Math.max(0,Math.min(255,o[_]*255));h.data[_*4]=g,h.data[_*4+1]=g,h.data[_*4+2]=g,h.data[_*4+3]=255}l.putImageData(h,0,0);for(let _=0;_<10;_++){let g=n()*512,f=n()*512;const p=40+n()*160,w=n()*Math.PI*2;r.strokeStyle=`rgba(38,36,32,${.4+n()*.3})`,r.lineWidth=1+n()*1.6,r.beginPath(),r.moveTo(g,f),l.strokeStyle="rgba(0,0,0,0.9)",l.lineWidth=r.lineWidth,l.beginPath(),l.moveTo(g,f);let v=w;for(let x=0;x<7;x++)v+=(n()-.5)*.9,g+=Math.cos(v)*p/7,f+=Math.sin(v)*p/7,r.lineTo(g,f),l.lineTo(g,f);r.stroke(),l.stroke()}r.globalAlpha=.08;for(let _=0;_<60;_++){r.fillStyle=n()>.5?"#0d0d0c":"#d8d4c9";const g=2+n()*14;r.beginPath(),r.arc(n()*512,n()*512,g,0,Math.PI*2),r.fill()}r.globalAlpha=1;const d=c.getContext("2d");return d.putImageData(h,0,0),d.drawImage(c,0,0),mn(512).getContext("2d").drawImage(i,0,0),{map:Is(i,{repeat:1,srgb:!0}),normalMap:Ds(o,512,512,2.6),roughnessMap:pa(o,512,512,!1)}}function Mg(){const t=new wi(515,4,4),e=ri(1201),n=mn(256),i=n.getContext("2d"),r=i.createImageData(256,256),a=new Float32Array(256*256);for(let o=0;o<256;o++)for(let c=0;c<256;c++){const l=c/256,h=o/256,d=t.sample(l,h),m=Math.abs(Math.sin((l*40+d*7)*Math.PI))>.985?22:0;let u=52+d*30+m;const _=t.sample(l*.5+.1,h*.5+.4),g=Math.max(0,_-.62)*2.4;let f=u+g*66,p=u+g*32,w=u+g*8;const v=(o*256+c)*4;r.data[v]=Math.min(255,f),r.data[v+1]=Math.min(255,p),r.data[v+2]=Math.min(255,w),r.data[v+3]=255,a[o*256+c]=d*.4+(m?.3:0)+g*.2}i.putImageData(r,0,0),i.globalAlpha=.35;for(let o=0;o<90;o++){i.strokeStyle=e()>.5?"rgba(180,180,175,0.5)":"rgba(10,10,10,0.6)",i.lineWidth=.6+e();const c=e()*256,l=e()*256;i.beginPath(),i.moveTo(c,l),i.lineTo(c+(e()-.5)*80,l+(e()-.5)*20),i.stroke()}return i.globalAlpha=1,{map:Is(n,{repeat:1,srgb:!0}),normalMap:Ds(a,256,256,1.5),roughnessMap:pa(a,256,256,!0)}}function Sg(){const t=new wi(818,4,3),e=ri(313),n=mn(256),i=n.getContext("2d"),a=256/5;i.fillStyle="#8a6b42",i.fillRect(0,0,256,256);const o=new Float32Array(256*256);for(let l=0;l<256;l++){const h=Math.floor(l/a),d=l%a/a,m=.78+h*37%11/38;for(let u=0;u<256;u++){const _=l/256,g=u/256,f=t.sample(_*.4,g*3.5+h*.2),p=t.sample(_*1.5,g*12),w=d<.06||d>.94?0:1;let v=(128+f*58+p*10)*m,x=(96+f*42+p*8)*m,A=(59+f*28+p*5)*m;w||(v*=.34,x*=.32,A*=.3),i.fillStyle=`rgb(${v|0},${x|0},${A|0})`,o[u*256+l]=w?.6+f*.2:.08}}const c=i.getImageData(0,0,256,256);for(let l=0;l<256;l++)for(let h=0;h<256;h++){const d=Math.floor(h/a),m=h%a/a,u=h/256,_=l/256,g=t.sample(u*.4,_*3.5+d*.2),f=t.sample(u*1.5,_*12),p=.78+d*37%11/38,w=m<.06||m>.94,v=(Math.abs(_-.24)<.012||Math.abs(_-.76)<.012)&&Math.abs(m-.5)<.03;let x=(128+g*58+f*10)*p,A=(98+g*42+f*8)*p,E=(62+g*28+f*5)*p;w&&(x*=.3,A*=.3,E*=.3),v&&(x=95,A=92,E=86);const C=(l*256+h)*4;c.data[C]=x,c.data[C+1]=A,c.data[C+2]=E,c.data[C+3]=255,o[l*256+h]=v?.8:w?.1:.62+g*.16}i.putImageData(c,0,0),i.globalAlpha=.2;for(let l=0;l<60;l++){i.strokeStyle=e()>.5?"#3d2a17":"#c9a36a",i.lineWidth=.6;const h=e()*256,d=e()*256;i.beginPath(),i.moveTo(h,d),i.lineTo(h+(e()-.5)*30,d+(e()-.5)*4),i.stroke()}return i.globalAlpha=1,{map:Is(n,{repeat:1,srgb:!0}),normalMap:Ds(o,256,256,2.4)}}function yg(){const t=new wi(1919,4,4),e=ri(441),n=mn(256),i=n.getContext("2d"),r=i.createImageData(256,256),a=new Float32Array(256*256);for(let o=0;o<256;o++)for(let c=0;c<256;c++){const l=c/256,h=o/256,d=Math.sin(l*Math.PI*90)*Math.sin(h*Math.PI*90)*.5+.5,m=t.sample(l,h),u=Math.max(0,t.sample(l*.45+.2,h*.45)-.55)*.7;let _=146+m*26+d*13-u*44,g=128+m*23+d*11-u*38,f=92+m*18+d*8-u*30;e()>.996&&(_-=30,g-=26,f-=20);const p=(o*256+c)*4;r.data[p]=Math.max(0,Math.min(255,_)),r.data[p+1]=Math.max(0,Math.min(255,g)),r.data[p+2]=Math.max(0,Math.min(255,f)),r.data[p+3]=255,a[o*256+c]=.5+d*.3+m*.2}i.putImageData(r,0,0),i.globalAlpha=.12,i.strokeStyle="#4e422d";for(let o=0;o<15;o++)i.beginPath(),i.moveTo(e()*256,0),i.lineTo(e()*256,256),i.stroke();return i.globalAlpha=1,{map:Is(n,{repeat:1,srgb:!0}),normalMap:Ds(a,256,256,1.3)}}function wg(){const t=new wi(2727,5,5),e=ri(808),n=mn(512),i=n.getContext("2d"),r=i.createImageData(512,512),a=new Float32Array(512*512);for(let o=0;o<512;o++)for(let c=0;c<512;c++){const l=c/512,h=o/512,d=t.sample(l,h),m=t.sample(l*2.7+.3,h*2.7),u=Math.max(0,m-.56)*1.8,_=34+d*27;let g=_+u*58,f=_+u*57,p=_+u*54;const w=(o*512+c)*4;r.data[w]=Math.min(255,g),r.data[w+1]=Math.min(255,f),r.data[w+2]=Math.min(255,p),r.data[w+3]=255,a[o*512+c]=d*.5+u*.3}i.putImageData(r,0,0),i.globalAlpha=.5;for(let o=0;o<160;o++){const c=e()*512,l=e()*512;i.strokeStyle=e()>.55?"rgba(156,158,152,0.5)":"rgba(6,6,6,0.55)",i.lineWidth=.5+e()*.9,i.beginPath(),i.moveTo(c,l),i.lineTo(c+(e()-.5)*30,l+(e()-.5)*5),i.stroke()}return i.globalAlpha=1,{map:Is(n,{repeat:1,srgb:!0}),normalMap:Ds(a,512,512,.8),roughnessMap:pa(a,512,512,!0)}}function bg(){const t=mn(128),e=t.getContext("2d"),n=ri(66),i=e.createRadialGradient(128/2,128/2,2,128/2,128/2,128*.48);i.addColorStop(0,"rgba(0,0,0,0.98)"),i.addColorStop(.13,"rgba(8,7,6,0.96)"),i.addColorStop(.3,"rgba(28,25,21,0.72)"),i.addColorStop(.55,"rgba(52,46,38,0.3)"),i.addColorStop(1,"rgba(52,46,38,0)"),e.fillStyle=i,e.fillRect(0,0,128,128),e.strokeStyle="rgba(20,18,16,0.55)";for(let a=0;a<12;a++){const o=n()*Math.PI*2,c=6+n()*22;e.lineWidth=.8+n()*1.2,e.beginPath(),e.moveTo(128/2+Math.cos(o)*4,128/2+Math.sin(o)*4),e.lineTo(128/2+Math.cos(o)*c,128/2+Math.sin(o)*c),e.stroke()}const r=new Ei(t);return r.colorSpace=qe,r}function eo(s,t,e,n=128){const i=mn(n),r=i.getContext("2d"),a=r.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);for(const[c,l]of e)a.addColorStop(c,l);r.fillStyle=a,r.fillRect(0,0,n,n);const o=new Ei(i);return o.colorSpace=qe,o}function Eg(){const t=mn(256),e=t.getContext("2d");e.translate(256/2,256/2);const n=e.createRadialGradient(0,0,0,0,0,256/2);n.addColorStop(0,"rgba(255,255,245,1)"),n.addColorStop(.16,"rgba(255,232,170,0.98)"),n.addColorStop(.38,"rgba(255,160,60,0.55)"),n.addColorStop(.7,"rgba(255,110,20,0.12)"),n.addColorStop(1,"rgba(255,80,0,0)"),e.fillStyle=n,e.beginPath(),e.arc(0,0,256/2,0,Math.PI*2),e.fill(),e.globalCompositeOperation="lighter";for(let r=0;r<7;r++){const a=r/7*Math.PI*2+.3,o=256*(.24+r%3*.07);e.save(),e.rotate(a);const c=e.createLinearGradient(0,0,o,0);c.addColorStop(0,"rgba(255,240,200,0.9)"),c.addColorStop(1,"rgba(255,120,20,0)"),e.fillStyle=c,e.beginPath(),e.moveTo(0,0),e.lineTo(o,-6),e.lineTo(o*.7,0),e.lineTo(o,6),e.closePath(),e.fill(),e.restore()}const i=new Ei(t);return i.colorSpace=qe,i}function Tg(){const t=mn(128),e=t.getContext("2d"),n=ri(9090);for(let r=0;r<14;r++){const a=64+(n()-.5)*44,o=128/2+(n()-.5)*44,c=14+n()*26,l=e.createRadialGradient(a,o,0,a,o,c);l.addColorStop(0,"rgba(255,255,255,0.15)"),l.addColorStop(.5,"rgba(255,255,255,0.07)"),l.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=l,e.beginPath(),e.arc(a,o,c,0,Math.PI*2),e.fill()}const i=new Ei(t);return i.colorSpace=qe,i}const nn={};function Lh(){return nn.ready||(nn.sand=vg(),nn.concrete=xg(),nn.metal=Mg(),nn.wood=Sg(),nn.fabric=yg(),nn.gunmetal=wg(),nn.hole=bg(),nn.flash=Eg(),nn.smoke=Tg(),nn.dust=eo(0,1,[[0,"rgba(255,255,255,0.55)"],[.35,"rgba(255,255,255,0.22)"],[1,"rgba(255,255,255,0)"]],64),nn.blood=eo(0,1,[[0,"rgba(120,10,6,0.85)"],[.4,"rgba(80,6,4,0.5)"],[1,"rgba(40,2,1,0)"]],64),nn.glow=eo(0,1,[[0,"rgba(255,220,160,0.9)"],[.3,"rgba(255,170,70,0.35)"],[1,"rgba(255,120,20,0)"]],128),nn.ready=!0),nn}const Ag=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
}
`,Rg=`
varying vec3 vDir;
uniform vec3 sunDir;
uniform float time;
uniform float storm;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + 13.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  vec3 zenith = mix(vec3(0.045, 0.085, 0.16), vec3(0.10, 0.15, 0.24), 1.0 - storm);
  vec3 horizon = mix(vec3(0.66, 0.47, 0.31), vec3(0.44, 0.38, 0.34), storm);
  vec3 ground = vec3(0.13, 0.11, 0.09);
  float t = clamp(h, 0.0, 1.0);
  vec3 col = mix(horizon, zenith, pow(t, 0.52));
  col = mix(col, ground, smoothstep(0.002, -0.14, h));

  float sd = max(dot(dir, normalize(sunDir)), 0.0);
  col += vec3(1.0, 0.52, 0.20) * pow(sd, 7.0) * 0.34;
  col += vec3(1.0, 0.68, 0.32) * pow(sd, 90.0) * 0.75;
  col += vec3(1.0, 0.86, 0.58) * pow(sd, 900.0) * 2.4;

  vec2 cuv = dir.xz / (abs(dir.y) + 0.28);
  float cl = fbm(cuv * 0.9 + vec2(time * 0.004, time * 0.0015));
  cl = smoothstep(0.42, 0.82, cl) * smoothstep(0.01, 0.28, dir.y);
  float cl2 = fbm(cuv * 2.1 - vec2(time * 0.007, 0.0));
  cl2 = smoothstep(0.55, 0.9, cl2) * smoothstep(0.03, 0.4, dir.y);
  vec3 cloudCol = mix(vec3(0.72, 0.52, 0.40), vec3(0.26, 0.24, 0.24), storm);
  cloudCol += vec3(1.0, 0.55, 0.25) * pow(sd, 4.0) * 0.5;
  col = mix(col, cloudCol, cl * 0.55);
  col = mix(col, cloudCol * 0.86, cl2 * 0.35);

  float band = smoothstep(0.012, 0.0, abs(h - 0.005)) * (1.0 - storm * 0.5);
  col += vec3(0.9, 0.5, 0.24) * band * 0.16;
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dither, 1.0);
}
`;function Ce(s,t,e){if(!s)return null;const n=s.clone();return n.needsUpdate=!0,n.repeat.set(t,e),n}function cr(s,t,e,{srgb:n=!0}={}){const i=document.createElement("canvas");i.width=s,i.height=t;const r=i.getContext("2d");e(r,s,t);const a=new Ei(i);return a.colorSpace=n?qe:Rn,a.anisotropy=4,a}function Fc(s,t="",e={}){return cr(512,256,r=>{r.fillStyle=e.bg||"#b89a58",r.fillRect(0,0,512,256);const a=r.createLinearGradient(0,0,0,256);a.addColorStop(0,"rgba(255,255,255,0.08)"),a.addColorStop(1,"rgba(0,0,0,0.24)"),r.fillStyle=a,r.fillRect(0,0,512,256),r.strokeStyle=e.ink||"#171510",r.lineWidth=14,r.strokeRect(16,16,480,224),r.fillStyle=e.ink||"#171510",r.font="bold 74px Arial",r.textAlign="center",r.fillText(s,512/2,256/2+8),t&&(r.font="bold 28px monospace",r.fillText(t,512/2,256/2+62));for(let o=0;o<220;o++)r.fillStyle=`rgba(${40+Math.random()*30},${34+Math.random()*24},${24+Math.random()*20},${Math.random()*.14})`,r.fillRect(Math.random()*512,Math.random()*256,Math.random()*26+2,Math.random()*6+1);r.strokeStyle="rgba(30,26,20,0.5)",r.lineWidth=3;for(let o=0;o<8;o++)r.beginPath(),r.moveTo(Math.random()*512,Math.random()*256),r.lineTo(Math.random()*512,Math.random()*256),r.stroke()})}function Cg(){return cr(512,512,(s,t,e)=>{s.fillStyle="#0b0d10",s.fillRect(0,0,t,e);for(let n=0;n<26;n++)for(let i=0;i<26;i++){if(Math.random()>.72)continue;const r=Math.random()>.55;s.fillStyle=r?`rgba(${220+Math.random()*30},${170+Math.random()*40},${90+Math.random()*40},${.5+Math.random()*.5})`:"rgba(18,22,26,0.9)",s.fillRect(6+i*19,6+n*19,10,11)}})}function Pg(){return cr(128,128,(s,t,e)=>{s.clearRect(0,0,t,e),s.strokeStyle="rgba(150,152,145,0.8)",s.lineWidth=2;for(let n=-4;n<12;n++)s.beginPath(),s.moveTo(n*16,0),s.lineTo(n*16+e,e),s.stroke(),s.beginPath(),s.moveTo(n*16,e),s.lineTo(n*16+e,0),s.stroke()})}function Ig(){return cr(256,256,(s,t,e)=>{const n=s.createRadialGradient(t/2,e/2,4,t/2,e/2,t/2);n.addColorStop(0,"rgba(8,7,6,0.9)"),n.addColorStop(.45,"rgba(16,14,11,0.55)"),n.addColorStop(1,"rgba(20,18,14,0)"),s.fillStyle=n,s.fillRect(0,0,t,e),s.strokeStyle="rgba(10,9,7,0.5)";for(let i=0;i<22;i++){const r=Math.random()*Math.PI*2;s.lineWidth=1+Math.random()*2,s.beginPath(),s.moveTo(t/2,e/2),s.lineTo(t/2+Math.cos(r)*(30+Math.random()*90),e/2+Math.sin(r)*(30+Math.random()*90)),s.stroke()}})}function Dg(){return cr(256,160,(s,t,e)=>{s.fillStyle="#2c3128",s.fillRect(0,0,t,e),s.fillStyle="rgba(190,170,120,0.85)",s.beginPath(),s.arc(t*.32,e*.5,26,0,Math.PI*2),s.fill(),s.fillStyle="rgba(60,40,30,0.8)",s.fillRect(20,e*.7,t-40,8),s.fillStyle="rgba(220,220,205,0.65)";for(let n=0;n<40;n++)s.fillRect(Math.random()*t,Math.random()*e,Math.random()*18,1);s.fillStyle="rgba(0,0,0,0.35)",s.fillRect(0,0,t,12),s.fillRect(0,e-12,t,12)})}async function Lg(s,t,e){const n=Lh(),i=e.mobile,r=[],a=[],o=[new T(0,0,-28),new T(-27,0,-14),new T(28,0,-10),new T(-26,0,20),new T(27,0,18),new T(-15,0,-26),new T(18,0,-24),new T(-20,0,14),new T(20,0,11),new T(-14,0,2),new T(13,0,-8),new T(-2,0,-20),new T(23,0,-2),new T(-1,0,-10),new T(10,0,-14),new T(-12,0,-12),new T(14,0,4),new T(-16,0,6),new T(6,0,-2),new T(-6,0,-2),new T(10,0,3),new T(-10,0,3),new T(0,0,-4)],c=new T(0,1.72,21),l=new T(-.52,.26,-.81).normalize(),h={sunDir:{value:l},time:{value:0},storm:{value:.22}},d=new dt(new pn(420,48,24),new Qe({uniforms:h,vertexShader:Ag,fragmentShader:Rg,side:dn,depthWrite:!1,fog:!1}));d.frustumCulled=!1,s.add(d);const m=new Ko,u=new dt(new pn(50,32,16),d.material);m.add(u);const _=new Jo(t);_.compileCubemapShader();const g=_.fromScene(m,.04,.1,100);s.environment=g.texture,s.environmentIntensity=.42,_.dispose(),u.geometry.dispose(),s.fog=new fl(7890515,i?.0065:.0048);const f={sand:new Vt({map:Ce(n.sand.map,34,34),normalMap:Ce(n.sand.normalMap,34,34),roughnessMap:Ce(n.sand.roughnessMap,34,34),roughness:.98,metalness:0,color:13811098,normalScale:new Rt(.85,.85),envMapIntensity:.55}),concretePad:new Vt({map:Ce(n.concrete.map,13,13),normalMap:Ce(n.concrete.normalMap,13,13),roughnessMap:Ce(n.concrete.roughnessMap,13,13),roughness:.94,metalness:0,color:12891808,normalScale:new Rt(1.05,1.05),envMapIntensity:.5}),wall:new Vt({map:Ce(n.concrete.map,3.2,1.15),normalMap:Ce(n.concrete.normalMap,3.2,1.15),roughnessMap:Ce(n.concrete.roughnessMap,3.2,1.15),color:12366753,roughness:.92,metalness:0,normalScale:new Rt(1.1,1.1),envMapIntensity:.5}),concrete:new Vt({map:Ce(n.concrete.map,1.6,1.6),normalMap:Ce(n.concrete.normalMap,1.6,1.6),roughnessMap:Ce(n.concrete.roughnessMap,1.6,1.6),color:11774874,roughness:.9,metalness:.02,normalScale:new Rt(1,1),envMapIntensity:.55}),metal:new Vt({map:Ce(n.metal.map,1.6,1.6),normalMap:Ce(n.metal.normalMap,1.6,1.6),roughnessMap:Ce(n.metal.roughnessMap,1.6,1.6),roughness:.52,metalness:.82,color:9145733,envMapIntensity:.9}),darkMetal:new Vt({map:Ce(n.metal.map,1.2,1.2),normalMap:Ce(n.metal.normalMap,1.2,1.2),roughness:.5,metalness:.85,color:3948601,envMapIntensity:.9}),rust:new Vt({map:Ce(n.metal.map,1,1),normalMap:Ce(n.metal.normalMap,1,1),roughness:.78,metalness:.55,color:10119236,envMapIntensity:.7}),wood:new Vt({map:Ce(n.wood.map,1,1),normalMap:Ce(n.wood.normalMap,1,1),roughness:.84,metalness:0,envMapIntensity:.45}),fabric:new Vt({map:Ce(n.fabric.map,1,1),normalMap:Ce(n.fabric.normalMap,1,1),roughness:.96,metalness:0,envMapIntensity:.4}),sandbag:new Vt({map:Ce(n.fabric.map,.45,.3),normalMap:Ce(n.fabric.normalMap,.45,.3),roughness:.98,metalness:0,color:12034678,envMapIntensity:.35}),rubber:new Vt({color:1052944,roughness:.9,metalness:0}),paint:new Vt({color:2040864,roughness:.6,metalness:.15}),hazard:new Vt({color:12028719,roughness:.7,metalness:.1}),glass:new Vt({color:1186332,roughness:.12,metalness:.65,envMapIntensity:1.4}),lamp:new Vt({color:2236962,emissive:16767392,emissiveIntensity:5,roughness:.4}),lampRed:new Vt({color:3342336,emissive:16722450,emissiveIntensity:4,roughness:.4}),tarp:new Vt({color:4868662,roughness:.9,metalness:0,side:sn}),asphalt:new Vt({color:2763045,roughness:.92,metalness:.04})},p=Cg(),w=new Vt({map:p,emissiveMap:p,emissive:16761466,emissiveIntensity:.7,color:2304560,roughness:.85,metalness:.1,fog:!0}),v=new Oe;v.name="world",s.add(v);function x(U,{cast:X=!0,receive:H=!0,collide:q=!1,blocker:it=!1,ry:Mt=0}={}){if(U.castShadow=X,U.receiveShadow=H,Mt&&(U.rotation.y=Mt),v.add(U),it&&a.push(U),q){const Nt=Math.abs(Math.cos(Mt))*(U.geometry.parameters?.width??1)+Math.abs(Math.sin(Mt))*(U.geometry.parameters?.depth??1),Et=Math.abs(Math.sin(Mt))*(U.geometry.parameters?.width??1)+Math.abs(Math.cos(Mt))*(U.geometry.parameters?.depth??1);A(U.position.x,U.position.z,Nt,Et)}return U}function A(U,X,H,q,it=0){r.push({minX:U-H/2-it,maxX:U+H/2+it,minZ:X-q/2-it,maxZ:X+q/2+it})}function E(U,X,H,q,it,Mt,Nt,Et=0,kt={}){const Ae=new yt(U,X,H),Bt=new dt(Ae,q);return Bt.position.set(it,Mt,Nt),Bt.rotation.y=Et,x(Bt,kt)}function C(U,X,H,q,it,Mt,Nt,Et,kt=0,Ae={}){const Bt=new dt(new Se(U,X,H,q),it);return Bt.position.set(Mt,Nt,Et),Bt.rotation.y=kt,x(Bt,Ae)}const I=new dt(new $e(320,320,1,1),f.sand);I.rotation.x=-Math.PI/2,I.receiveShadow=!0,I.castShadow=!1,I.position.y=0,v.add(I),a.push(I);const y=new dt(new $e(52,52),f.concretePad);y.rotation.x=-Math.PI/2,y.position.set(0,.015,0),y.receiveShadow=!0,v.add(y),a.push(y);const S=new dt(new $e(9,76),f.asphalt);S.rotation.x=-Math.PI/2,S.position.set(0,.02,-6),S.receiveShadow=!0,v.add(S),a.push(S);const D=new Mi({map:Ig(),transparent:!0,opacity:.7,depthWrite:!1,color:723464});for(const[U,X,H,q]of[[2.5,5,2.2,.4],[-8,-9,1.5,1.2],[13,-13,2.8,2.4],[-19,14,1.8,.2]]){const it=new dt(new $e(H,H),D);it.rotation.x=-Math.PI/2,it.rotation.z=q,it.position.set(U,.03,X),v.add(it)}const N=new Vt({color:658443,roughness:.3,metalness:.35,envMapIntensity:.55,transparent:!0,opacity:.4});for(const[U,X,H]of[[-4,15,1.6],[6,-3,2.2],[17,9,1.2],[-13,3,1.4]]){const q=new dt(new ar(H,20),N);q.rotation.x=-Math.PI/2,q.scale.y=.55,q.position.set(U,.035,X),v.add(q)}const k=31.5,K=2.9,B=.55,Y=[[-20.5,-k,21,0],[20.5,-k,21,0],[-25,k,12,0],[24,k,14,0],[-k,-18,26,Math.PI/2],[-k,15,18,Math.PI/2],[k,-17,24,Math.PI/2],[k,16,20,Math.PI/2]];for(const[U,X,H,q]of Y){E(H,K,B,f.wall,U,K/2,X,q,{collide:!0,blocker:!0});const it=E(H+.12,.1,B+.14,f.concrete,U,K+.05,X,q,{cast:!1});it.receiveShadow=!0;for(let Mt=-1;Mt<=1;Mt+=2){const Nt=q===0?U+Mt*H*.32:U,Et=q===0?X:X+Mt*H*.32;E(.28,K+.16,B+.1,f.concrete,Nt,(K+.16)/2,Et,q,{collide:!1})}}const nt=new pn(1,10,6),W=new Vt({color:11047276,roughness:1,metalness:0,flatShading:!0}),ut=[[-22,-28.6,2.4,.8],[-10,-30.5,2,.7],[8,-30.2,2.6,.9],[25,-28,2.2,.8],[-28.5,-5,2.5,.8],[29.5,8,2.3,.7],[-20,29,3,.8],[18,29.5,2.6,.7]];for(const[U,X,H,q]of ut){const it=new dt(nt,W);it.position.set(U,.05,X),it.scale.set(H,q,H*.7),it.receiveShadow=!0,v.add(it)}const j=new dt(new $e(2.4,1.2),new Vt({map:Fc("POSTO ALFA","SETOR 07 // RESTRITO"),roughness:.8,metalness:.05}));j.position.set(-4.4,1.75,-30.7),v.add(j);const gt=new dt(new $e(1.7,.85),new Vt({map:Fc("PERIGO","ZONA DE TIRO",{bg:"#a8823c"}),roughness:.8}));gt.position.set(29.1,1.5,-9),gt.rotation.y=-Math.PI/2,v.add(gt);const It=-19,jt=-17,re=12,$t=7,Z=4.1;E(re,.24,$t,f.concrete,It,.12,jt,0,{collide:!1}),E(re,Z,.4,f.wall,It,Z/2,jt-$t/2,0,{collide:!0,blocker:!0}),E(4.6,Z,.4,f.wall,It-3.7,Z/2,jt+$t/2,0,{collide:!0,blocker:!0}),E(4.6,Z,.4,f.wall,It+3.7,Z/2,jt+$t/2,0,{collide:!0,blocker:!0}),E(2.8,1.1,.42,f.wall,It,Z-.55,jt+$t/2,0,{collide:!1,blocker:!0}),E(.4,Z,$t,f.wall,It-re/2,Z/2,jt,0,{collide:!0,blocker:!0}),E(.4,Z,$t,f.wall,It+re/2,Z/2,jt,0,{collide:!0,blocker:!0}),E(re+.7,.32,$t+.7,f.concrete,It,Z+.16,jt,0,{cast:!0}),E(re-.8,.06,$t-.8,f.concretePad,It,.26,jt,0,{cast:!1});for(const U of[-4.2,0,4.2]){const X=new dt(new $e(1.5,.6),f.glass);X.position.set(It+U,2.5,jt+$t/2+.205),v.add(X),E(1.85,.12,.34,f.concrete,It+U,2.85,jt+$t/2+.02)}E(2.9,.16,.5,f.darkMetal,It,2.58,jt+$t/2,0,{cast:!1}),E(2.2,.8,.9,f.wood,It-3.5,.65,jt-2.2),E(1.8,.75,.8,f.metal,It+3.6,.62,jt-2.4),E(.5,1.2,.5,f.darkMetal,It+2.6,.85,jt-1.5);const st=new Oe;for(let U=0;U<3;U++){const X=new dt(new $e(.55,.35),new Mi({color:U===1?8378565:3628886}));X.position.set(It-2.2+U*.65,1.85,jt-3.44),st.add(X)}const bt=new dt(new yt(1.5,.9,.6),f.darkMetal);bt.position.set(It-1.6,1.35,jt-3.2),bt.castShadow=!0,v.add(bt),v.add(st);const Ht=new vs(16761466,i?12:18,9,2);Ht.position.set(It,3.2,jt),v.add(Ht);const Ft=new dt(new pn(.07,8,8),f.lamp);Ft.position.copy(Ht.position),v.add(Ft);const ne=20,Ne=-20;E(8,3.4,6,f.wall,ne,1.7,Ne,0,{collide:!0,blocker:!0}),E(8.4,.25,6.4,f.concrete,ne,3.5,Ne),E(2.2,2.2,.2,f.darkMetal,ne,1.25,Ne+3.02,0,{cast:!1});const P=new vs(10475724,8,6,2);P.position.set(ne,2.3,Ne+2.2),v.add(P);const Ee=ne+2.6,Zt=Ne-1.2;C(.09,.12,9,8,f.darkMetal,Ee,4.5,Zt,0,{collide:!1});for(let U=0;U<5;U++){const X=3+U*1.4,H=new dt(new yt(1.6-U*.14,.05,.05),f.darkMetal);H.position.set(Ee,X,Zt),H.rotation.y=U*.7,v.add(H);const q=new dt(new pn(.045,6,6),f.lampRed);q.position.set(Ee+(1.6-U*.14)/2,X,Zt),v.add(q)}const Gt=new dt(new pn(.8,16,10,0,Math.PI*2,0,Math.PI/2.6),f.metal);Gt.rotation.set(.9,.8,0),Gt.position.set(ne-1.2,4.4,Ne-2.4),Gt.castShadow=!0,v.add(Gt);const Tt=new dt(new Se(.05,.05,1.6,6),f.darkMetal);Tt.position.set(ne-1.2,4.4,Ne-2.4),Tt.rotation.z=.9,v.add(Tt);const he=-7,St=-27,ie=f.darkMetal;for(const[U,X]of[[-1.4,-1.4],[1.4,-1.4],[-1.4,1.4],[1.4,1.4]]){const H=new dt(new yt(.22,5.6,.22),ie);H.position.set(he+U,2.8,St+X),H.rotation.z=U*.012,H.castShadow=!0,v.add(H),A(he+U,St+X,.34,.34),a.push(H)}E(3.6,.28,3.6,f.wood,he,5.4,St);for(const[U,X,H,q]of[[0,-1.7,3.6,.12],[0,1.7,3.6,.12],[-1.7,0,.12,3.6],[1.7,0,.12,3.6]])E(H,.9,q,f.darkMetal,he+U,6,St+X);E(4,.16,4,f.metal,he,7.15,St);for(const[U,X]of[[-1.8,-1.8],[1.8,-1.8],[-1.8,1.8],[1.8,1.8]])E(.14,1.75,.14,f.darkMetal,he+U,6.25,St+X);for(let U=0;U<10;U++){const X=new dt(new yt(.7,.05,.05),f.darkMetal);X.position.set(he+1.75,.7+U*.5,St+1.75),v.add(X)}E(.06,5.3,.06,f.darkMetal,he+1.42,2.9,St+1.75),E(.06,5.3,.06,f.darkMetal,he+2.08,2.9,St+1.75);const Be=new dt(new pe(.7,.28,.34,2,.08),f.sandbag);Be.position.set(he-.9,5.68,St-1.2),Be.castShadow=!0,v.add(Be);function De(U,X,H,q){const it=new Oe,Mt=new Vt({map:Ce(n.metal.map,3.4,1.3),normalMap:Ce(n.metal.normalMap,3.4,1.3),roughness:.72,metalness:.6,color:q,envMapIntensity:.7}),Nt=new dt(new yt(6.1,2.6,2.44),Mt);Nt.position.y=1.3,Nt.castShadow=Nt.receiveShadow=!0,it.add(Nt);for(let Et=0;Et<15;Et++){const kt=new dt(new yt(.08,2.5,.06),f.darkMetal);kt.position.set(-2.85+Et*.4,1.3,1.24),it.add(kt);const Ae=kt.clone();Ae.position.z=-1.24,it.add(Ae)}for(const Et of[-2.5,2.5]){const kt=new dt(new yt(.14,2.5,2.5),f.darkMetal);kt.position.set(Et,1.3,0),it.add(kt)}for(const Et of[-1,1]){const kt=new dt(new yt(6.1,.12,.12),f.darkMetal);kt.position.set(0,Et>0?2.62:.04,Et*1.22),it.add(kt)}return it.position.set(U,0,X),it.rotation.y=H,it.traverse(Et=>{Et.isMesh&&(Et.castShadow=!0,Et.receiveShadow=!0)}),v.add(it),A(U,X,6.5,2.9),a.push(Nt),it}De(12.5,.5,.06,7101248),De(-23.5,7.5,1.25,4870983),De(23,22,-.18,6901818);const R=new pe(.62,.26,.36,2,.09),M=[];function O(U,X,H,q,it=3){const Mt=Math.floor(H/.62);for(let Nt=0;Nt<it;Nt++)for(let Et=0;Et<Mt;Et++){const kt=-H/2+.31+Et*.62+(Nt%2?.16:0),Ae=(Nt-(it-1)/2)*.28,Bt=U+Math.cos(q)*kt-Math.sin(q)*Ae,fe=X+Math.sin(q)*kt+Math.cos(q)*Ae;M.push({x:Bt,y:.15+Nt*.235,z:fe,ry:q+(Math.random()-.5)*.18,rx:(Math.random()-.5)*.08,rz:(Math.random()-.5)*.08,s:.94+Math.random()*.12})}A(U,X,Math.abs(Math.cos(q))*H+Math.abs(Math.sin(q))*it*.3+.2,Math.abs(Math.sin(q))*H+Math.abs(Math.cos(q))*it*.3+.2)}O(-9,8,4.4,.12,3),O(9,11,4.6,-.18,3),O(15,-7,3.8,.9,3),O(-15,-3,4.2,-.9,3),O(0,-7,3.2,0,2),O(4.8,-6.8,2.6,1.1,2),O(-6,19,4.6,.02,3),O(20,12,3.4,-.6,2);const $=new zr(R,f.sandbag,M.length);$.castShadow=!0,$.receiveShadow=!0;const tt=new Ue;M.forEach((U,X)=>{tt.position.set(U.x,U.y,U.z),tt.rotation.set(U.rx,U.ry,U.rz),tt.scale.setScalar(U.s),tt.updateMatrix(),$.setMatrixAt(X,tt.matrix)}),$.instanceMatrix.needsUpdate=!0,v.add($),a.push($);function J(U,X,H,q=0,it=0,Mt=16777215){const Nt=f.wood,Et=E(H,H,H,Nt,U,q+H/2,X,it,{collide:!1});Et.material=Nt;const kt=.055;for(const[Ae,Bt,fe,ln,oi,li]of[[0,H/2-kt,H/2,H+.02,kt*1.3,kt*1.3],[0,-H/2+kt,H/2,H+.02,kt*1.3,kt*1.3],[0,H/2-kt,-H/2,H+.02,kt*1.3,kt*1.3],[0,-H/2+kt,-H/2,H+.02,kt*1.3,kt*1.3],[H/2,0,0,kt*1.3,H,kt*1.3],[-H/2,0,0,kt*1.3,H,kt*1.3]]){const Yi=new dt(new yt(ln,oi,li),f.darkMetal);Yi.position.set(Ae,Bt,fe),Ae===0&&Math.abs(fe)>0&&Yi.scale.set(1,1,1),Et.add(Yi)}return Et}const zt=[[22,14,1.3,0,.1],[23.4,14.3,1.05,0,.5],[22.4,14.1,1.1,1.3,.25],[-20,20,1.2,0,-.2],[-18.7,20.6,1,0,.4],[-21.2,21.4,1.3,0,.15],[5,-14,1.15,0,.3],[6.2,-13.8,.95,0,.9],[5.1,-14.1,.9,1.15,.1],[16,20,1.2,0,-.3],[15,20.8,1,0,.2],[-8,23.5,1.1,0,.5],[-9.2,23.2,1.35,0,.05]];for(const[U,X,H,q,it]of zt)J(U,X,H,q,it);A(22.5,14.2,3.4,2.2),A(-20,21,3.4,2.4),A(5.5,-14,2.6,2.2),A(15.5,20.4,3,2.2),A(-8.6,23.3,3,2.2);function ht(U,X,H=!1){const q=H?f.rust:f.metal,it=C(.34,.34,.92,14,q,U,.46,X);for(const Mt of[.25,.68]){const Nt=new dt(new gi(.345,.022,5,16),f.darkMetal);Nt.rotation.x=Math.PI/2,Nt.position.set(0,Mt-.46,0),it.add(Nt)}if(!H){const Mt=new dt(new Se(.345,.345,.22,14,1,!0),f.hazard);Mt.position.y=.03,it.add(Mt)}A(U,X,.74,.74),a.push(it)}const Dt=[[18.5,-4.2],[19.4,-3.3],[18.9,-3.6,!0],[-5.8,17.2],[-6.7,17.9],[10.4,24.4],[26,5],[26.8,5.6,!0],[-24,-6],[-22.5,13]];for(const[U,X,H]of Dt)ht(U,X,!!H);const Ct=11.5,at=-3.6;ht(Ct,at,!0);const vt=new vs(16738846,i?20:34,12,2);vt.position.set(Ct,1.2,at),v.add(vt);const qt=[],Ut=new ei({map:n.glow,color:16752708,transparent:!0,opacity:.9,blending:xn,depthWrite:!1});for(let U=0;U<3;U++){const X=new mi(Ut.clone());X.position.set(Ct+(Math.random()-.5)*.15,1+U*.18,at+(Math.random()-.5)*.15),X.scale.setScalar(.75-U*.12),v.add(X),qt.push(X)}const _t=[],Qt=new ei({map:n.smoke,color:2828839,transparent:!0,opacity:.16,depthWrite:!1});for(let U=0;U<7;U++){const X=new mi(Qt.clone());X.position.set(Ct+(Math.random()-.5)*.7,1.4+U*.9,at+(Math.random()-.5)*.7),X.scale.setScalar(1.3+U*.55),v.add(X),_t.push({sp:X,baseX:X.position.x,baseZ:X.position.z,phase:Math.random()*10,speed:.22+Math.random()*.16})}const L=new Vt({color:11568689,roughness:.8,metalness:.05});function rt(U,X,H){const q=new Oe,it=new dt(new yt(2,.35,.8),L);it.position.y=.175;const Mt=new dt(new yt(2,.62,.42),L);Mt.position.y=.66;const Nt=new dt(new yt(2,.12,.28),f.concrete);Nt.position.y=1.02;for(const Et of[it,Mt,Nt])Et.castShadow=!0,Et.receiveShadow=!0,q.add(Et);q.position.set(U,0,X),q.rotation.y=H,v.add(q),A(U,X,Math.abs(Math.cos(H))*2.1+Math.abs(Math.sin(H))*.9,Math.abs(Math.sin(H))*2.1+Math.abs(Math.cos(H))*.9),a.push(it);for(let Et=0;Et<4;Et++){const kt=new dt(new yt(.18,.6,.02),f.paint);kt.position.set(-.75+Et*.5,.66,.22),kt.rotation.z=.35,q.add(kt)}}rt(-2.4,13.5,.06),rt(3.2,2.5,.12),rt(.5,-12.5,-.08),rt(-11.5,-10.5,1.1),rt(24,4.5,1.45);const ft=[];function wt(U,X,H,q,it=!0){const Mt=new Oe,Nt=new dt(new Se(.09,.13,7,8),f.darkMetal);Nt.position.y=3.5,Nt.castShadow=!0,Mt.add(Nt);const Et=new Oe;Et.position.set(0,6.9,0),Et.rotation.y=Math.atan2(H-U,q-X),Et.rotation.x=.42;const kt=new dt(new yt(.85,.5,.3),f.darkMetal);kt.castShadow=!0,Et.add(kt);const Ae=new dt(new $e(.7,.36),f.lamp);Ae.position.z=.16,Et.add(Ae);const Bt=new mi(new ei({map:n.glow,color:16767392,transparent:!0,opacity:.55,blending:xn,depthWrite:!1}));if(Bt.scale.setScalar(2.6),Bt.position.z=.25,Et.add(Bt),Mt.add(Et),Mt.position.set(U,0,X),v.add(Mt),A(U,X,.35,.35),a.push(Nt),it){const fe=new Sd(16763276,i?70:110,30,.62,.55,1.6);fe.position.set(U,6.9,X),fe.target.position.set(H,0,q),fe.castShadow=!1,v.add(fe),v.add(fe.target);const ln=new T(H-U,-6.9,q-X),oi=ln.length(),li=new dt(new ml(oi*Math.tan(.34),oi,22,1,!0),new Mi({color:16763276,transparent:!0,opacity:.035,blending:xn,depthWrite:!1,side:sn}));li.position.set((U+H)/2,3.45,(X+q)/2),li.quaternion.setFromUnitVectors(new T(0,-1,0),ln.clone().normalize()),v.add(li),ft.push({light:fe,glow:Bt,cone:li})}}wt(-24.5,-24.5,-18,-14),wt(24.5,-24.5,19,-15),wt(24.5,24.5,18,16,!i),wt(-24.5,24.5,-18,16,!i);const ot=new xh({color:1052944,transparent:!0,opacity:.8});function et(U,X,H=1.2){const q=U.clone().lerp(X,.5);q.y-=H;const it=new md([U,q,X]),Mt=new He().setFromPoints(it.getPoints(16)),Nt=new fd(Mt,ot);v.add(Nt)}et(new T(-24.5,6.9,-24.5),new T(-7,7.1,-27),.9),et(new T(24.5,6.9,-24.5),new T(23,3.6,-20),.7),et(new T(-24.5,6.9,-24.5),new T(-28,5.2,-26),.4),et(new T(24.5,6.9,24.5),new T(24.5,7.1,-24.5),3.2);const Pt=new _l(.18,0),Jt=new Vt({color:8352865,roughness:.95,metalness:.02,flatShading:!0}),ve=i?90:160,ue=new zr(Pt,Jt,ve),Te=no(4242);for(let U=0;U<ve;U++){const X=Te()*Math.PI*2,H=6+Te()*24;tt.position.set(Math.cos(X)*H,.06+Te()*.05,Math.sin(X)*H),tt.rotation.set(Te()*3,Te()*3,Te()*3),tt.scale.set(.4+Te()*1.3,.3+Te()*.8,.4+Te()*1.3),tt.updateMatrix(),ue.setMatrixAt(U,tt.matrix)}ue.castShadow=!0,ue.receiveShadow=!0,v.add(ue);const wn=new $e(.22,.3),hr=new Vt({color:12103834,roughness:.9,side:sn}),In=new zr(wn,hr,30);for(let U=0;U<30;U++)tt.position.set((Te()-.5)*40,.045,(Te()-.5)*40),tt.rotation.set(-Math.PI/2,0,Te()*6),tt.scale.setScalar(.7+Te()*.8),tt.updateMatrix(),In.setMatrixAt(U,tt.matrix);In.receiveShadow=!0,v.add(In);const Ls=new Se(.018,.018,.055,6),ur=new Vt({color:11569733,metalness:.9,roughness:.35}),Us=new zr(Ls,ur,46);for(let U=0;U<46;U++)tt.position.set((Te()-.5)*14-2,.05,4+(Te()-.5)*8),tt.rotation.set(Math.PI/2,Te()*6,Te()*6),tt.scale.setScalar(.8+Te()*.5),tt.updateMatrix(),Us.setMatrixAt(U,tt.matrix);v.add(Us);const Yn=Pg();Yn.wrapS=Yn.wrapT=yi,Yn.repeat.set(4,1.2);const dr=new Vt({map:Yn,transparent:!0,alphaTest:.15,side:sn,roughness:.5,metalness:.7,color:9277574});for(const[U,X,H,q]of[[13.5,-23,0,8],[13.5,-27,0,8],[9.5,-25,Math.PI/2,4],[17.5,-25,Math.PI/2,4]]){const it=new dt(new $e(q,2),dr);it.position.set(U,1,X),it.rotation.y=H,it.castShadow=!1,v.add(it);for(let Mt=-q/2;Mt<=q/2;Mt+=2){const Nt=U+Math.cos(H)*Mt,Et=X+Math.sin(H)*Mt,kt=new dt(new Se(.035,.035,2.1,6),f.darkMetal);kt.position.set(Nt,1.05,Et),v.add(kt)}A(U,X,H===0?q:.15,H===0?.15:q)}E(2.4,1.3,1.2,f.metal,15.5,.65,-25,.1,{collide:!1}),C(.1,.1,.9,8,f.darkMetal,16.2,1.75,-25.2);const Ti=new dt(new pn(.05,6,6),f.lampRed);Ti.position.set(14.5,1.2,-24.7),v.add(Ti);const fr=new Vt({map:Dg(),side:sn,roughness:.95,metalness:0}),ai=new dt(new $e(2.4,1.5,12,6),fr);ai.position.set(-19,5,-13.4),ai.castShadow=!0,v.add(ai);const pr=ai.geometry.attributes.position.array.slice(),Xi=new dt(new $e(4.2,2.6,6,4),f.tarp);Xi.position.set(17.8,1.7,14.6),Xi.rotation.set(-.6,.2,.1),Xi.castShadow=!0,v.add(Xi);const Ns=new Oe,qi=no(99);for(let U=0;U<46;U++){const X=-Math.PI*.15+U/46*Math.PI*1.3,H=100+qi()*48,q=5+qi()*12,it=6+qi()*30,Mt=new dt(new yt(q,it,4+qi()*8),w);Mt.position.set(Math.cos(X)*H,it/2-1,Math.sin(X)*H),Mt.rotation.y=-X,Ns.add(Mt)}Ns.position.y=0,v.add(Ns);const ga=new Vt({color:4866360,roughness:1,metalness:0,flatShading:!0,side:sn}),_a=new Vt({color:6048832,roughness:1,metalness:0,flatShading:!0,side:sn});function b(U,X,H,q,it=44){const Mt=no(H),Nt=[],Et=[];for(let Bt=0;Bt<=it;Bt++){const fe=Bt/it*Math.PI*2,ln=U+(Mt()-.5)*18,oi=X*(.35+Mt()*.9);Nt.push(Math.cos(fe)*ln,0,Math.sin(fe)*ln),Nt.push(Math.cos(fe)*(ln+6),oi,Math.sin(fe)*(ln+6))}for(let Bt=0;Bt<it;Bt++){const fe=Bt*2;Et.push(fe,fe+1,fe+2,fe+1,fe+3,fe+2)}const kt=new He;kt.setAttribute("position",new be(Nt,3)),kt.setIndex(Et),kt.computeVertexNormals();const Ae=new dt(kt,q);return Ae.position.y=-1,v.add(Ae),Ae}b(190,26,71,ga,52),b(160,18,33,_a,46);const F=i?500:900,V=new He,G=new Float32Array(F*3),z=new Float32Array(F);for(let U=0;U<F;U++)G[U*3]=(Math.random()-.5)*44,G[U*3+1]=Math.random()*8,G[U*3+2]=(Math.random()-.5)*44,z[U]=Math.random()*10;V.setAttribute("position",new Je(G,3)),V.setAttribute("aPhase",new Je(z,1));const lt=new Mh({map:n.dust,color:15259316,size:i?.06:.045,transparent:!0,opacity:.35,depthWrite:!1,blending:xn,sizeAttenuation:!0}),mt=new Sh(V,lt);mt.frustumCulled=!1,s.add(mt);const At=new bh(8886445,8153680,.48);s.add(At);const pt=new Qs(16763271,2.35);pt.position.copy(l).multiplyScalar(70),pt.target.position.set(0,0,0),pt.castShadow=!0,pt.shadow.mapSize.set(i?1024:2048,i?1024:2048),pt.shadow.camera.left=-38,pt.shadow.camera.right=38,pt.shadow.camera.top=38,pt.shadow.camera.bottom=-38,pt.shadow.camera.near=1,pt.shadow.camera.far=160,pt.shadow.bias=-35e-5,pt.shadow.normalBias=.025,pt.shadow.radius=2,s.add(pt),s.add(pt.target);const Wt=new Qs(5073542,.28);Wt.position.set(20,12,30),s.add(Wt);const Xt=new mi(new ei({map:n.glow,color:16760954,transparent:!0,opacity:.3,blending:xn,depthWrite:!1}));Xt.scale.setScalar(20),Xt.position.copy(l).multiplyScalar(220),s.add(Xt);const Ot=ai.geometry.attributes.position;let Yt=0;function ge(U,X){Yt+=U,h.time.value=Yt,d.position.copy(X.position),mt.position.x=X.position.x,mt.position.z=X.position.z,mt.rotation.y=Yt*.004,Xt.position.copy(X.position).addScaledVector(l,220);for(let q=0;q<Ot.count;q++){const it=pr[q*3],Mt=pr[q*3+1],Nt=(it+1.2)/2.4;Ot.setZ(q,Math.sin(Nt*5+Yt*2.4)*.12*Nt),Ot.setY(q,Mt+Math.sin(Nt*4+Yt*1.8)*.05*Nt)}Ot.needsUpdate=!0;const H=.72+Math.sin(Yt*21)*.14+Math.sin(Yt*37)*.08+Math.random()*.06;vt.intensity=(i?20:34)*H,qt.forEach((q,it)=>{q.scale.setScalar(.55+(Math.sin(Yt*9+it*2)*.5+.5)*.35),q.position.y=.95+it*.15+Math.sin(Yt*13+it)*.05,q.material.opacity=.5+H*.4});for(const q of _t){const it=(Yt*q.speed+q.phase)%7/7;q.sp.position.y=1.2+it*6.5,q.sp.position.x=q.baseX+Math.sin(Yt*.8+q.phase)*(.3+it*1.2),q.sp.position.z=q.baseZ+Math.cos(Yt*.6+q.phase)*(.3+it*1.2),q.sp.scale.setScalar(1.2+it*3.4),q.sp.material.opacity=Math.max(0,.19*(1-it))}for(const q of ft)q.glow.material.opacity=.45+Math.sin(Yt*3+q.light.position.x)*.04}function Fe(U,X){for(const H of r){const q=Math.max(H.minX,Math.min(U.x,H.maxX)),it=Math.max(H.minZ,Math.min(U.z,H.maxZ)),Mt=U.x-q,Nt=U.z-it,Et=Mt*Mt+Nt*Nt;if(Et<X*X){const kt=Math.sqrt(Et)||1e-4,Ae=X-kt;U.x+=Mt/kt*Ae,U.z+=Nt/kt*Ae}}U.x=Pe.clamp(U.x,-29.6,29.6),U.z=Pe.clamp(U.z,-29.6,29.6)}const ce=-30,Kt=60,Lt=1,Ie=new Uint8Array(Kt*Kt);for(let U=0;U<Kt;U++)for(let X=0;X<Kt;X++){const H=ce+(X+.5)*Lt,q=ce+(U+.5)*Lt;let it=!1;if((Math.abs(H)>29.4||Math.abs(q)>29.4)&&(it=!0),!it){for(const Mt of r)if(H>Mt.minX-.46&&H<Mt.maxX+.46&&q>Mt.minZ-.46&&q<Mt.maxZ+.46){it=!0;break}}Ie[U*Kt+X]=it?1:0}function le(U,X){return{x:Pe.clamp(Math.floor((U-ce)/Lt),0,Kt-1),z:Pe.clamp(Math.floor((X-ce)/Lt),0,Kt-1)}}function Ve(U,X){return U>=0&&X>=0&&U<Kt&&X<Kt&&!Ie[X*Kt+U]}function kn(U,X){if(Ve(U,X))return{x:U,z:X};for(let H=1;H<9;H++)for(let q=-H;q<=H;q++)for(let it=-H;it<=H;it++)if(!(Math.abs(it)!==H&&Math.abs(q)!==H)&&Ve(U+it,X+q))return{x:U+it,z:X+q};return null}function on(U,X){let H=U.x,q=U.z;const it=X.x,Mt=X.z,Nt=Math.abs(it-H),Et=Math.abs(Mt-q),kt=H<it?1:-1,Ae=q<Mt?1:-1;let Bt=Nt-Et,fe=0;for(;fe++<200;){if(!Ve(H,q))return!1;if(H===it&&q===Mt)return!0;const ln=2*Bt;ln>-Et&&(Bt-=Et,H+=kt),ln<Nt&&(Bt+=Nt,q+=Ae)}return!0}function Ai(U,X){const H=kn(le(U.x,U.z).x,le(U.x,U.z).z),q=kn(le(X.x,X.z).x,le(X.x,X.z).z);if(!H||!q)return null;const it=H.z*Kt+H.x,Mt=q.z*Kt+q.x;if(it===Mt)return[{x:ce+(q.x+.5),z:ce+(q.z+.5)}];const Nt=Kt*Kt,Et=new Float32Array(Nt).fill(1/0),kt=new Int32Array(Nt).fill(-1),Ae=new Uint8Array(Nt),Bt=[],fe=Ge=>{const We=Ge%Kt,Ke=Ge/Kt|0,fn=Math.abs(We-q.x),Dn=Math.abs(Ke-q.z);return fn+Dn+(Math.SQRT2-2)*Math.min(fn,Dn)},ln=Ge=>{Bt.push(Ge);let We=Bt.length-1;for(;We>0;){const Ke=We-1>>1;if(Et[Bt[Ke]]+fe(Bt[Ke])<=Et[Bt[We]]+fe(Bt[We]))break;const fn=Bt[Ke];Bt[Ke]=Bt[We],Bt[We]=fn,We=Ke}},oi=()=>{const Ge=Bt[0],We=Bt.pop();if(Bt.length>0){Bt[0]=We;let Ke=0;for(;;){const fn=Ke*2+1,Dn=fn+1;let bn=Ke;if(fn<Bt.length&&Et[Bt[fn]]+fe(Bt[fn])<Et[Bt[bn]]+fe(Bt[bn])&&(bn=fn),Dn<Bt.length&&Et[Bt[Dn]]+fe(Bt[Dn])<Et[Bt[bn]]+fe(Bt[bn])&&(bn=Dn),bn===Ke)break;const mr=Bt[bn];Bt[bn]=Bt[Ke],Bt[Ke]=mr,Ke=bn}}return Ge};Et[it]=0,ln(it);const li=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];let Yi=!1,Bh=0;for(;Bt.length>0&&Bh++<5e3;){const Ge=oi();if(Ae[Ge])continue;if(Ge===Mt){Yi=!0;break}Ae[Ge]=1;const We=Ge%Kt,Ke=Ge/Kt|0;for(const[fn,Dn,bn]of li){const mr=We+fn,Tl=Ke+Dn;if(!Ve(mr,Tl)||fn!==0&&Dn!==0&&(!Ve(We+fn,Ke)||!Ve(We,Ke+Dn)))continue;const Fs=Tl*Kt+mr;if(Ae[Fs])continue;const Al=Et[Ge]+bn;Al<Et[Fs]&&(Et[Fs]=Al,kt[Fs]=Ge,ln(Fs))}}if(!Yi)return null;const jn=[];let ji=Mt,kh=0;for(;ji!==-1&&kh++<500&&(jn.push({x:ji%Kt,z:ji/Kt|0}),ji!==it);)ji=kt[ji];jn.reverse();const El=Ge=>({x:ce+(Ge.x+.5)*Lt,z:ce+(Ge.z+.5)*Lt}),va=[];let Ki=0;for(;Ki<jn.length-1;){va.push(El(jn[Ki]));let Ge=Ki+1;for(let We=jn.length-1;We>Ki;We--)if(on(jn[Ki],jn[We])){Ge=We;break}Ki=Ge}return va.push(El(jn[jn.length-1])),va}function Le(U,X){const H=le(U,X),q=kn(H.x,H.z);return q?new T(ce+(q.x+.5)*Lt,0,ce+(q.z+.5)*Lt):new T(U,0,X)}return{world:v,colliders:r,findPath:Ai,nearestWalkable:Le,blockers:a,spawnPoints:o,playerSpawn:c,sunDirection:l,sun:pt,dust:mt,update:ge,resolveCollisions:Fe,mats:f,textures:n}}function no(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class Ug{constructor(){this.ctx=null,this.master=null,this.noiseBuffer=null,this.enabled=!1,this.wind=null,this.lastStep=0}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;const e=this.ctx.createDynamicsCompressor();e.threshold.value=-16,e.knee.value=18,e.ratio.value=6,e.attack.value=.003,e.release.value=.18,this.master=this.ctx.createGain(),this.master.gain.value=.7,this.master.connect(e),e.connect(this.ctx.destination);const n=this.ctx.sampleRate*2,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=i.getChannelData(0);for(let a=0;a<n;a++)r[a]=Math.random()*2-1;this.noiseBuffer=i,this.enabled=!0,this.startAmbience()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}noise(t,{gain:e=.3,type:n="lowpass",freq:i=1200,q:r=1,attack:a=.002,pan:o=0,when:c=0}={}){if(!this.enabled)return;const l=this.ctx.currentTime+c,h=this.ctx.createBufferSource();h.buffer=this.noiseBuffer,h.loop=!0;const d=this.ctx.createBiquadFilter();d.type=n,d.frequency.setValueAtTime(i,l),d.Q.value=r;const m=this.ctx.createGain();m.gain.setValueAtTime(1e-4,l),m.gain.exponentialRampToValueAtTime(e,l+a),m.gain.exponentialRampToValueAtTime(1e-4,l+t);const u=this.ctx.createStereoPanner();return u.pan.value=Pe.clamp(o,-1,1),h.connect(d),d.connect(m),m.connect(u),u.connect(this.master),h.start(l),h.stop(l+t+.02),{filter:d,env:m,t:l}}tone(t,{gain:e=.2,freq:n=440,type:i="sine",attack:r=.005,pan:a=0,when:o=0,glideTo:c=null}={}){if(!this.enabled)return;const l=this.ctx.currentTime+o,h=this.ctx.createOscillator();h.type=i,h.frequency.setValueAtTime(n,l),c&&h.frequency.exponentialRampToValueAtTime(c,l+t);const d=this.ctx.createGain();d.gain.setValueAtTime(1e-4,l),d.gain.exponentialRampToValueAtTime(e,l+r),d.gain.exponentialRampToValueAtTime(1e-4,l+t);const m=this.ctx.createStereoPanner();m.pan.value=Pe.clamp(a,-1,1),h.connect(d),d.connect(m),m.connect(this.master),h.start(l),h.stop(l+t+.02)}startAmbience(){if(!this.enabled||this.wind)return;const t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=380,e.Q.value=.6;const n=this.ctx.createGain();n.gain.value=.045;const i=this.ctx.createOscillator();i.frequency.value=.09;const r=this.ctx.createGain();r.gain.value=.022,i.connect(r),r.connect(n.gain),t.connect(e),e.connect(n),n.connect(this.master),t.start(),i.start(),this.wind={src:t,gain:n,lfo:i}}gunshot(t=0){this.enabled&&(this.noise(.14,{gain:.62,type:"bandpass",freq:1500,q:.7,pan:t,attack:.001}),this.noise(.06,{gain:.5,type:"highpass",freq:4200,q:.5,pan:t,attack:.001}),this.tone(.18,{gain:.52,freq:132,type:"sine",glideTo:42,pan:t,attack:.002}),this.tone(.05,{gain:.16,freq:2400,type:"square",glideTo:900,pan:t,attack:.001}),this.noise(.32,{gain:.09,type:"lowpass",freq:520,q:.4,pan:t,attack:.01,when:.02}))}enemyShot(t=20,e=0){if(!this.enabled)return;const n=Pe.clamp(1-t/70,.12,1);this.noise(.16,{gain:.38*n,type:"bandpass",freq:900+Math.random()*500,q:.8,pan:e,attack:.001}),this.tone(.2,{gain:.22*n,freq:95,type:"sine",glideTo:40,pan:e,attack:.002}),this.noise(.4,{gain:.1*n,type:"lowpass",freq:420,q:.3,pan:e,attack:.01,when:.01})}suppression(t=0){this.enabled&&(this.noise(.09,{gain:.2,type:"bandpass",freq:2600,q:2,pan:t,attack:.001}),this.tone(.08,{gain:.07,freq:3200,type:"sine",pan:t,attack:.001,glideTo:1400}))}impact(t=0){this.enabled&&this.noise(.05,{gain:.12,type:"bandpass",freq:2200,q:1.4,pan:t,attack:.001})}reloadStep(t){this.enabled&&(t===0?(this.noise(.04,{gain:.18,type:"bandpass",freq:900,q:2,attack:.001}),this.tone(.05,{gain:.1,freq:240,type:"square",attack:.001})):t===1?(this.noise(.06,{gain:.25,type:"bandpass",freq:600,q:1.5,attack:.001}),this.tone(.07,{gain:.14,freq:150,type:"sine",attack:.001,glideTo:70})):(this.noise(.07,{gain:.22,type:"highpass",freq:3e3,q:1,attack:.001}),this.tone(.05,{gain:.08,freq:720,type:"square",attack:.001}),this.noise(.05,{gain:.16,type:"bandpass",freq:1200,q:2,attack:.001,when:.09})))}empty(){this.enabled&&(this.noise(.03,{gain:.18,type:"highpass",freq:3e3,attack:.001}),this.tone(.03,{gain:.07,freq:380,type:"square",attack:.001}))}footstep(t=!1){if(!this.enabled)return;const e=performance.now();e-this.lastStep<(t?250:330)||(this.lastStep=e,this.noise(t?.1:.08,{gain:t?.16:.1,type:"lowpass",freq:340+Math.random()*140,q:.8,attack:.003}),this.noise(.03,{gain:.05,type:"bandpass",freq:1500,q:1.2,attack:.001}))}hitmarker(t=!1){this.enabled&&(this.tone(.055,{gain:t?.2:.13,freq:t?1750:1250,type:"triangle",attack:.001}),t&&this.tone(.09,{gain:.12,freq:2350,type:"sine",attack:.001,when:.03}))}kill(){this.enabled&&(this.tone(.09,{gain:.16,freq:820,type:"triangle",attack:.001}),this.tone(.16,{gain:.14,freq:1080,type:"sine",attack:.002,when:.05}))}hurt(){this.enabled&&(this.noise(.2,{gain:.32,type:"lowpass",freq:280,q:.7,attack:.002}),this.tone(.45,{gain:.16,freq:72,type:"sine",glideTo:44,attack:.005}),this.tone(.9,{gain:.035,freq:3100,type:"sine",attack:.01,glideTo:2600}))}waveStart(){this.enabled&&(this.tone(1.2,{gain:.16,freq:58,type:"sine",attack:.02,glideTo:52}),this.tone(.18,{gain:.12,freq:620,type:"square",attack:.002,when:.25}),this.tone(.18,{gain:.12,freq:620,type:"square",attack:.002,when:.55}),this.tone(.34,{gain:.14,freq:930,type:"square",attack:.002,when:.85}))}waveClear(){this.enabled&&(this.tone(.4,{gain:.14,freq:440,type:"triangle",attack:.01}),this.tone(.5,{gain:.14,freq:660,type:"triangle",attack:.01,when:.18}),this.tone(.7,{gain:.12,freq:880,type:"sine",attack:.01,when:.36}))}ui(){this.enabled&&this.tone(.04,{gain:.08,freq:900,type:"square",attack:.001})}distantBattle(){if(!this.enabled)return;const t=Math.random()*1.6-.8;this.tone(.5+Math.random()*.5,{gain:.05+Math.random()*.04,freq:50+Math.random()*30,type:"sine",glideTo:34,pan:t,attack:.01}),this.noise(.25,{gain:.035,type:"lowpass",freq:250,q:.5,pan:t,attack:.01})}}const Ng=`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
uniform float uScale;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSize * uScale / max(0.15, -mv.z), 0.0, 90.0);
  gl_Position = projectionMatrix * mv;
}
`,Fg=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = length(p);
  float a = smoothstep(0.5, 0.06, d);
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;class io{constructor(t,e,n){this.max=e,this.count=0,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.gravity=new Float32Array(e),this.drag=new Float32Array(e),this.grow=new Float32Array(e),this.base=new Float32Array(e);const i=new He;i.setAttribute("position",new Je(this.pos,3)),i.setAttribute("aColor",new Je(this.col,3)),i.setAttribute("aSize",new Je(this.size,1)),i.setAttribute("aAlpha",new Je(this.alpha,1)),i.setDrawRange(0,0),this.geo=i,this.mat=new Qe({vertexShader:Ng,fragmentShader:Fg,uniforms:{uScale:{value:700}},transparent:!0,depthWrite:!1,blending:n}),this.points=new Sh(i,this.mat),this.points.frustumCulled=!1,t.add(this.points)}spawn(t,e,n,i,r,a,{life:o=.6,size:c=.1,color:l=[1,1,1],gravity:h=0,drag:d=1,grow:m=0}={}){if(this.count>=this.max)return;const u=this.count++;this.pos[u*3]=t,this.pos[u*3+1]=e,this.pos[u*3+2]=n,this.vel[u*3]=i,this.vel[u*3+1]=r,this.vel[u*3+2]=a,this.col[u*3]=l[0],this.col[u*3+1]=l[1],this.col[u*3+2]=l[2],this.size[u]=c,this.base[u]=c,this.alpha[u]=1,this.life[u]=o,this.maxLife[u]=o,this.gravity[u]=h,this.drag[u]=d,this.grow[u]=m}update(t){let e=0;for(;e<this.count;){if(this.life[e]-=t,this.life[e]<=0){const r=--this.count;e!==r&&(this.pos[e*3]=this.pos[r*3],this.pos[e*3+1]=this.pos[r*3+1],this.pos[e*3+2]=this.pos[r*3+2],this.vel[e*3]=this.vel[r*3],this.vel[e*3+1]=this.vel[r*3+1],this.vel[e*3+2]=this.vel[r*3+2],this.col[e*3]=this.col[r*3],this.col[e*3+1]=this.col[r*3+1],this.col[e*3+2]=this.col[r*3+2],this.size[e]=this.size[r],this.base[e]=this.base[r],this.alpha[e]=this.alpha[r],this.life[e]=this.life[r],this.maxLife[e]=this.maxLife[r],this.gravity[e]=this.gravity[r],this.drag[e]=this.drag[r],this.grow[e]=this.grow[r]);continue}const n=Math.pow(this.drag[e],t*60);this.vel[e*3]*=n,this.vel[e*3+1]=this.vel[e*3+1]*n-this.gravity[e]*t,this.vel[e*3+2]*=n,this.pos[e*3]+=this.vel[e*3]*t,this.pos[e*3+1]+=this.vel[e*3+1]*t,this.pos[e*3+2]+=this.vel[e*3+2]*t,this.pos[e*3+1]<.02&&(this.pos[e*3+1]=.02,this.vel[e*3+1]*=-.3,this.vel[e*3]*=.6,this.vel[e*3+2]*=.6);const i=this.life[e]/this.maxLife[e];this.alpha[e]=Math.min(1,i/.14),this.size[e]=this.base[e]*(1+(1-i)*this.grow[e]),e++}this.geo.setDrawRange(0,this.count),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aColor.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0,this.geo.attributes.aAlpha.needsUpdate=!0}}class zg{constructor(t,e,n,i){this.scene=t,this.camera=e,this.T=n,this.mobile=i,this.sparks=new io(t,i?260:460,xn),this.dust=new io(t,i?240:420,vi),this.blood=new io(t,i?180:300,vi),this.decals=[],this.maxDecals=i?34:70,this.decalGeo=new $e(1,1),this.decalMat=new Mi({map:n.hole,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,color:16777215}),this.tracers=[],this.tracerPool=[];for(let o=0;o<(i?10:18);o++){const c=new Mi({color:16761466,transparent:!0,opacity:0,blending:xn,depthWrite:!1,fog:!1}),l=new dt(new Se(.012,.012,1,5,1,!0),c);l.visible=!1,l.frustumCulled=!1,t.add(l),this.tracerPool.push({mesh:l,life:0,max:.075})}this.casings=[];const r=new Se(.011,.011,.038,6),a=new Vt({color:12753490,metalness:.9,roughness:.3});for(let o=0;o<18;o++){const c=new dt(r,a);c.visible=!1,c.castShadow=!1,t.add(c),this.casings.push({mesh:c,vel:new T,life:0,spin:new T})}this.smokePuffs=[];for(let o=0;o<14;o++){const c=new mi(new ei({map:n.smoke,color:12301219,transparent:!0,opacity:0,depthWrite:!1}));c.visible=!1,c.scale.setScalar(.1),t.add(c),this.smokePuffs.push({sp:c,vel:new T,life:0,max:1,size:.4})}this._tmp=new T,this._q=new Rs,this._up=new T(0,1,0)}setScale(t,e){const n=t/(2*Math.tan(e*Math.PI/360));this.sparks.mat.uniforms.uScale.value=n,this.dust.mat.uniforms.uScale.value=n,this.blood.mat.uniforms.uScale.value=n}addDecal(t,e){const n=new dt(this.decalGeo,this.decalMat);if(n.position.copy(t).addScaledVector(e,.012),n.scale.setScalar(.11+Math.random()*.09),n.lookAt(this._tmp.copy(t).add(e)),n.rotateZ(Math.random()*Math.PI*2),this.scene.add(n),this.decals.push(n),this.decals.length>this.maxDecals){const i=this.decals.shift();this.scene.remove(i)}}impact(t,e,n="concrete"){const i=this.mobile?4:7,r=n==="metal"?[1,.72,.3]:[.62,.55,.43];for(let a=0;a<i;a++){const o=new T(e.x+(Math.random()-.5)*1.3,e.y+Math.random()*1.2,e.z+(Math.random()-.5)*1.3).normalize().multiplyScalar(2+Math.random()*5);this.sparks.spawn(t.x,t.y,t.z,o.x,o.y,o.z,{life:.18+Math.random()*.3,size:.035+Math.random()*.05,color:r,gravity:9,drag:.98,grow:0})}for(let a=0;a<(this.mobile?3:5);a++){const o=new T(e.x*.7+(Math.random()-.5)*.9,e.y*.7+Math.random()*.8,e.z*.7+(Math.random()-.5)*.9).multiplyScalar(.5+Math.random()*1.2);this.dust.spawn(t.x,t.y,t.z,o.x,o.y,o.z,{life:.7+Math.random()*.9,size:.12+Math.random()*.16,color:n==="metal"?[.4,.38,.35]:[.55,.5,.4],gravity:-.5,drag:.94,grow:2.2})}this.addDecal(t,e)}bloodHit(t,e){const n=this.mobile?6:10;for(let i=0;i<n;i++){const r=new T(e.x*1.5+(Math.random()-.5)*2.2,Math.random()*1.6,e.z*1.5+(Math.random()-.5)*2.2);this.blood.spawn(t.x,t.y,t.z,r.x,r.y,r.z,{life:.35+Math.random()*.5,size:.05+Math.random()*.08,color:[.33,.02,.015],gravity:7,drag:.96,grow:1.2})}for(let i=0;i<3;i++)this.dust.spawn(t.x,t.y,t.z,(Math.random()-.5)*.4,Math.random()*.3,(Math.random()-.5)*.4,{life:.5,size:.09,color:[.24,.05,.03],gravity:-.3,drag:.92,grow:2})}tracer(t,e){const n=this.tracerPool.find(a=>!a.mesh.visible);if(!n)return;const i=this._tmp.copy(e).sub(t),r=i.length();r<.1||(n.mesh.visible=!0,n.mesh.position.copy(t).addScaledVector(i,.5),n.mesh.scale.set(1,r,1),this._q.setFromUnitVectors(this._up,i.clone().normalize()),n.mesh.quaternion.copy(this._q),n.mesh.material.opacity=.85,n.life=n.max)}spawnCasing(t,e,n){const i=this.casings.find(r=>!r.mesh.visible);i&&(i.mesh.visible=!0,i.mesh.position.copy(t),i.vel.set(e.x*(1.2+Math.random())+n.x*.6+(Math.random()-.5)*.4,n.y*.9+1.4+Math.random()*.8,e.z*(1.2+Math.random())+n.z*.6+(Math.random()-.5)*.4),i.spin.set(Math.random()*20,Math.random()*20,Math.random()*20),i.life=2.4+Math.random(),i.mesh.rotation.set(Math.random()*3,Math.random()*3,0))}smoke(t,e,n=1,i=.3){for(let r=0;r<n;r++){const a=this.smokePuffs.find(o=>!o.sp.visible);if(!a)return;a.sp.visible=!0,a.sp.position.copy(t).add(new T((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12)),a.vel.set(e.x*(.5+Math.random())+(Math.random()-.5)*.4,e.y*.4+.4+Math.random()*.4,e.z*(.5+Math.random())+(Math.random()-.5)*.4),a.life=a.max=.7+Math.random()*.6,a.size=i*(.7+Math.random()*.7),a.sp.scale.setScalar(a.size),a.sp.material.opacity=.24}}muzzleSmoke(t,e){this.smoke(t,e,this.mobile?1:2,.22)}update(t){this.sparks.update(t),this.dust.update(t),this.blood.update(t);for(const e of this.tracerPool)e.mesh.visible&&(e.life-=t,e.life<=0?e.mesh.visible=!1:e.mesh.material.opacity=e.life/e.max*.9);for(const e of this.casings)if(e.mesh.visible){if(e.life-=t,e.life<=0){e.mesh.visible=!1;continue}e.vel.y-=12*t,e.mesh.position.addScaledVector(e.vel,t),e.mesh.rotation.x+=e.spin.x*t,e.mesh.rotation.y+=e.spin.y*t,e.mesh.rotation.z+=e.spin.z*t,e.mesh.position.y<.03&&(e.mesh.position.y=.03,e.vel.y*=-.38,e.vel.x*=.72,e.vel.z*=.72,e.spin.multiplyScalar(.7))}for(const e of this.smokePuffs){if(!e.sp.visible)continue;if(e.life-=t,e.life<=0){e.sp.visible=!1;continue}const n=1-e.life/e.max;e.sp.position.addScaledVector(e.vel,t),e.vel.multiplyScalar(.97),e.vel.y+=.15*t,e.sp.scale.setScalar(e.size*(1+n*3.2)),e.sp.material.opacity=.24*(1-n)*Math.min(1,n*8)}}}const so=new T(.15,-.16,-.62),Og=new T(0,-.0507,-.46),ro=new T(.2,-.255,-.6),ms={x:-.02,y:.1,z:.025},ao=new Bn(-.15,.4,.75);class Bg{constructor({viewScene:t,viewCamera:e,camera:n,audio:i,effects:r,textures:a,envMap:o,isMobile:c,callbacks:l}){this.viewScene=t,this.viewCamera=e,this.camera=n,this.audio=i,this.effects=r,this.isMobile=c,this.cb=l,this.T=a,this.magSize=30,this.mag=30,this.reserve=120,this.rpm=720,this.fireInterval=60/this.rpm,this.lastShot=-10,this.trigger=!1,this.triggerDownTime=0,this.ads=!1,this.adsBlend=0,this.sprinting=!1,this.reloading=!1,this.reloadTime=0,this.reloadDuration=2.05,this.reloadPhase=-1,this.recoil=0,this.recoilRot=0,this.kickSide=0,this.swayX=0,this.swayY=0,this.lookSwayX=0,this.lookSwayY=0,this.bobTime=0,this.flashTime=0,this.flashLife=.055,this.crosshairSpread=0,this.shotCount=0,this.group=new Oe,this.group.position.copy(so),t.add(this.group),this.magMesh=null,this.magHome=new T,this.magAnim=0,this.charging=null,this._m=new me,this._v=new T,this.group.scale.setScalar(.65),this.build(),this.buildLighting(o),this.viewCamera.fov=55,this.viewCamera.updateProjectionMatrix()}buildLighting(t){t&&(this.viewScene.environment=t);const e=new Qs(16765600,3.1);e.position.set(-2.5,3.2,2.2),this.viewScene.add(e);const n=new Qs(8366536,1.6);n.position.set(3,1.2,-2.5);const i=new Qs(16770496,.9);i.position.set(.4,.4,2.5),this.viewScene.add(i),this.viewScene.add(n);const r=new bh(9346478,3813671,.55);this.viewScene.add(r),this.flashLight=new vs(16761466,0,3,2),this.flashLight.position.set(0,.05,-.6),this.viewScene.add(this.flashLight)}build(){const t=this.T,e=new Vt({map:t.gunmetal.map,normalMap:t.gunmetal.normalMap,roughnessMap:t.gunmetal.roughnessMap,color:6514271,metalness:.78,roughness:.38,envMapIntensity:1.1}),n=new Vt({color:3488054,metalness:.8,roughness:.36,envMapIntensity:1.3}),i=new Vt({color:1514008,metalness:.12,roughness:.68,envMapIntensity:.7}),r=new Vt({color:6707007,metalness:.08,roughness:.74,envMapIntensity:.6}),a=new Vt({color:4274216,metalness:.1,roughness:.8}),o=new Vt({color:4473135,roughness:.9,metalness:.02}),c=new Vt({color:2434591,roughness:.88,metalness:.02}),l=new Vt({color:6051906,roughness:.97,metalness:0}),h=new Vt({color:4803644,roughness:.98,metalness:0}),d=new _d({color:2360837,metalness:.1,roughness:.06,transmission:0,emissive:2228224,emissiveIntensity:1,envMapIntensity:2.2,transparent:!0,opacity:.92}),m=new Vt({color:11569994,metalness:.9,roughness:.32}),u=(j,gt,It,jt,re,$t=0,Z=0,st=0,bt=this.group)=>{const Ht=new dt(j,gt);return Ht.position.set(It,jt,re),Ht.rotation.set($t,Z,st),Ht.castShadow=!1,Ht.receiveShadow=!1,bt.add(Ht),Ht};u(new pe(.074,.084,.3,3,.012),e,0,.006,-.075),u(new pe(.062,.058,.22,2,.008),n,0,-.036,-.045),u(new yt(.036,.012,.3),n,0,.053,-.09);for(let j=0;j<7;j++)u(new yt(.04,.006,.014),n,0,.058,-.2+j*.038);u(new yt(.006,.028,.062),m,.0375,.012,-.045),u(new yt(.012,.02,.028),n,.041,.026,-.095,0,0,.25),u(new yt(.045,.012,.022),n,0,.032,.072),u(new Se(.012,.012,.03,8),n,.04,.012,-.045,0,0,Math.PI/2),u(new Se(.009,.009,.012,10),n,-.038,-.028,-.025,0,0,Math.PI/2),u(new yt(.012,.018,.016),n,.038,-.043,-.045),u(new pe(.078,.076,.25,3,.012),r,0,.004,-.3),u(new yt(.058,.058,.255),n,0,.004,-.3);for(let j=0;j<7;j++)u(new yt(.082,.008,.02),a,0,.004,-.395+j*.03);for(let j=0;j<3;j++)u(new yt(.006,.05,.022),a,-.041,.004,-.39+j*.07),u(new yt(.006,.05,.022),a,.041,.004,-.39+j*.07);u(new yt(.034,.011,.23),n,0,.048,-.3);for(let j=0;j<6;j++)u(new yt(.038,.006,.012),n,0,.054,-.39+j*.036);u(new Se(.016,.017,.3,12),n,0,.006,-.5,Math.PI/2),u(new Se(.021,.023,.065,12),n,0,.006,-.625,Math.PI/2);for(let j=0;j<4;j++)u(new yt(.048,.008,.008),n,0,.021,-.638+j*.012);u(new Se(.011,.011,.02,10),new Vt({color:328965,roughness:1}),0,.006,-.66,Math.PI/2),u(new yt(.03,.034,.035),n,0,-.003,-.43),u(new Se(.005,.005,.22,6),n,0,.016,-.43,Math.PI/2),u(new Se(.016,.016,.1,8),n,0,-.006,.1,Math.PI/2);const _=u(new pe(.055,.075,.2,2,.012),r,0,-.012,.2);_.rotation.x=-.03,u(new yt(.057,.078,.02),i,0,-.015,.305),u(new yt(.044,.013,.13),i,0,.032,.19),u(new yt(.005,.02,.1),n,-.029,-.004,.21),u(new yt(.02,.036,.09),a,0,-.048,.18),u(new yt(.035,.012,.06),a,.031,-.035,.16,0,0,-.18);for(let j=0;j<3;j++)u(new yt(.058,.006,.012),a,0,-.042+j*.016,.309);u(new gi(.008,.0025,5,10),n,-.028,-.012,.135,0,Math.PI/2),u(new pe(.072,.062,.085,2,.008),n,0,-.06,-.075),u(new yt(.01,.016,.02),n,-.041,-.012,-.02),u(new yt(.008,.026,.05),a,.0405,.008,-.105),u(new yt(.006,.02,.03),n,-.0395,.022,-.135),u(new Se(.006,.006,.014,8),n,-.042,-.028,-.07,0,0,Math.PI/2),u(new gi(.011,.0035,6,10),n,-.038,-.012,.29,0,Math.PI/2);const g=u(new pe(.048,.115,.062,2,.01),i,0,-.098,.022);g.rotation.x=-.28;for(let j=0;j<5;j++)u(new yt(.05,.005,.006),a,0,-.055-j*.014,.052+j*.004);u(new gi(.026,.005,6,12,Math.PI),n,0,-.062,-.005,0,0,Math.PI),u(new yt(.008,.024,.006),n,0,-.062,-.03);const f=new Oe;f.position.set(0,-.1,-.055),this.group.add(f),this.magMesh=f,this.magHome.copy(f.position);const p=new dt(new pe(.052,.15,.082,2,.008),r);p.position.y=-.035,f.add(p);for(let j=0;j<4;j++){const gt=new dt(new yt(.054,.008,.084),a);gt.position.set(0,-.09+j*.03,0),f.add(gt)}const w=new dt(new pe(.05,.07,.078,2,.008),r);w.position.set(0,-.135,.012),w.rotation.x=.16,f.add(w);const v=new dt(new yt(.058,.014,.09),i);v.position.set(0,-.172,.02),f.add(v);const x=new Oe;x.position.set(0,.078,-.055),this.group.add(x);const A=new dt(new yt(.032,.028,.085),n);A.position.y=-.024,x.add(A);const E=new dt(new Se(.0205,.0205,.088,16,1,!0),n);E.rotation.x=Math.PI/2,x.add(E);const C=new dt(new ar(.0185,20),d);C.position.z=-.045,x.add(C);const I=new dt(new ar(.0185,20),d);I.position.z=.045,I.rotation.y=Math.PI,x.add(I);const y=new dt(new Se(.0235,.0235,.014,16,1,!0),n);y.rotation.x=Math.PI/2,y.position.z=-.042,x.add(y);for(const j of[-.021,.021]){const gt=new dt(new gi(.022,.0038,6,16),n);gt.position.z=j,x.add(gt)}const S=new dt(new Se(.01,.01,.014,10),n);S.position.set(.024,.006,0),S.rotation.z=Math.PI/2,x.add(S);const D=S.clone();D.position.set(0,.024,0),D.rotation.set(0,0,0),x.add(D),this.reticle=new mi(new ei({map:this.T.glow,color:16722458,transparent:!0,opacity:.95,blending:xn,depthWrite:!1,depthTest:!1})),this.reticle.scale.setScalar(.0065),this.reticle.position.set(0,0,.044),x.add(this.reticle),this.optic=x,u(new yt(.014,.03,.012),n,0,.075,-.6),u(new yt(.02,.007,.03),n,0,.07,-.585);for(const j of[-.009,.009])u(new yt(.004,.03,.006),n,j,.09,-.6);const N=new Oe;N.position.set(.008,-.098,.012),N.scale.setScalar(.85),this.group.add(N);const k=new dt(new pe(.062,.075,.078,2,.018),o);k.rotation.x=-.28,N.add(k);const K=new dt(new pe(.018,.058,.022,2,.008),o);K.position.set(-.03,.018,-.045),K.rotation.set(.25,.45,.3),N.add(K);for(let j=0;j<4;j++){const gt=new dt(new pe(.016,.036,.02,2,.007),c);gt.position.set(-.022+j*.0145,.012-j*.002,-.058),gt.rotation.set(-.9,0,.12*(j-1.5)),N.add(gt)}zc(this.group,new T(.05,-.11,.02),new T(.3,-.52,.16),.037,l);const B=new dt(new Se(.043,.039,.046,10),h);B.position.set(.088,-.19,.06),B.rotation.set(.9,0,-.62),this.group.add(B);const Y=new Oe;Y.position.set(-.002,-.042,-.335),Y.scale.setScalar(.9),this.group.add(Y);const nt=new dt(new pe(.052,.06,.095,2,.016),o);nt.rotation.set(.05,.02,.1),Y.add(nt);const W=new dt(new pe(.016,.05,.02,2,.007),o);W.position.set(.03,.024,.023),W.rotation.set(-.35,-.5,.45),Y.add(W);for(let j=0;j<4;j++){const gt=new dt(new pe(.014,.028,.052,2,.007),c);gt.position.set(-.024+j*.016,.032,-.018),gt.rotation.set(.1,0,-.12),Y.add(gt)}zc(this.group,new T(-.018,-.065,-.3),new T(-.27,-.5,-.02),.035,h);const ut=new dt(new Se(.041,.037,.046,10),l);ut.position.set(-.09,-.19,-.21),ut.rotation.set(1.05,0,.6),this.group.add(ut),this.leftHand=Y,this.flash=new mi(new ei({map:this.T.flash,color:16766880,transparent:!0,opacity:0,blending:xn,depthWrite:!1,depthTest:!1})),this.flash.scale.setScalar(.42),this.flash.position.set(0,.006,-.68),this.group.add(this.flash),this.flash.visible=!1,this.muzzle=new Ue,this.muzzle.position.set(0,.006,-.68),this.group.add(this.muzzle),this.flashGlow=new vs(16759654,0,1.4,2),this.flashGlow.position.set(0,.06,-.5),this.group.add(this.flashGlow),this.group.traverse(j=>{j.isMesh&&(j.castShadow=!1,j.receiveShadow=!1)})}getAmmoText(){return{mag:this.mag,reserve:this.reserve}}setADS(t){this.reloading||(this.ads=t,this.cb.onADS&&this.cb.onADS(t))}toggleADS(){this.setADS(!this.ads)}startFire(){this.trigger=!0,this.triggerDownTime=performance.now()/1e3}stopFire(){this.trigger=!1}reload(){this.reloading||this.mag>=this.magSize||this.reserve<=0||(this.reloading=!0,this.reloadTime=0,this.reloadPhase=-1,this.trigger=!1,this.ads=!1,this.ammoApplied=!1,this.cb.onReloadStart&&this.cb.onReloadStart(),this.audio.reloadStep(0))}refillReserve(t=60){this.reserve=Math.min(240,this.reserve+t),this.cb.onAmmoChange&&this.cb.onAmmoChange(this.getAmmoText())}reset(){this.mag=this.magSize,this.reserve=120,this.reloading=!1,this.reloadTime=0,this.ads=!1,this.adsBlend=0,this.trigger=!1,this.group.position.copy(so),this.group.rotation.set(ms.x,ms.y,ms.z),this.magMesh.position.copy(this.magHome),this.magMesh.rotation.set(0,0,0),this.recoil=0,this.recoilRot=0,this.cb.onAmmoChange&&this.cb.onAmmoChange(this.getAmmoText()),this.cb.onReloadEnd&&this.cb.onReloadEnd()}muzzleWorld(t){return this.muzzle.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.muzzle.matrixWorld),this.camera.localToWorld(t),t}fire(){const t=performance.now()/1e3;if(this.reloading||t-this.lastShot<this.fireInterval)return;if(this.mag<=0){this.audio.empty(),this.lastShot=t,this.trigger=!1,this.reserve>0&&this.reload();return}this.lastShot=t,this.mag--,this.shotCount++,this.cb.onAmmoChange&&this.cb.onAmmoChange(this.getAmmoText()),this.audio.gunshot((Math.random()-.5)*.1);const e=new T(0,0,-1).applyQuaternion(this.camera.quaternion),n=new T(1,0,0).applyQuaternion(this.camera.quaternion),i=new T(0,1,0).applyQuaternion(this.camera.quaternion),r=this.isMobile?1:0,o=(this.ads?.0011:.0105)+(this.sprinting?.02:0)+r*.002;e.addScaledVector(n,(Math.random()-.5)*o*2),e.addScaledVector(i,(Math.random()-.5)*o*2),e.normalize();const c=this.camera.getWorldPosition(new T);this.muzzleWorld(this._v);const l=this._v.clone();this.cb.onShoot&&this.cb.onShoot(c,e,l);const h=this.ads?.7:1;this.recoil+=.023*h,this.recoilRot+=.055*h,this.kickSide+=(Math.random()-.5)*.02*h,this.crosshairSpread=Math.min(1,this.crosshairSpread+.34),this.cb.onRecoil&&this.cb.onRecoil(.0055*h,(Math.random()-.5)*.0022),this.flashTime=this.flashLife,this.flash.visible=!0,this.flash.material.rotation=Math.random()*Math.PI*2,this.flash.scale.setScalar((.32+Math.random()*.22)*(this.ads?.8:1)),this.flashGlow.intensity=25,this.cb.onMuzzleFlash&&this.cb.onMuzzleFlash(l);const d=new T(0,0,-1).applyQuaternion(this.camera.quaternion);this.effects.muzzleSmoke(l,d);const m=new T(1,0,0).applyQuaternion(this.camera.quaternion),u=new T(0,1,0).applyQuaternion(this.camera.quaternion);this.effects.spawnCasing(l.clone().addScaledVector(d,-.28).addScaledVector(m,.06).addScaledVector(u,.02),m,u),this.mag===0&&this.reserve>0&&setTimeout(()=>{this.mag===0&&!this.reloading&&this.reserve>0&&this.reload()},380)}update(t,{moving:e=!1,sprinting:n=!1,grounded:i=!0,lookX:r=0,lookY:a=0}={}){this.sprinting=n&&!this.ads&&!this.reloading,this.trigger&&!this.reloading&&this.fire();const o=this.ads?1:0,c=this.reloading?9:12;if(this.adsBlend+=(o-this.adsBlend)*Math.min(1,t*c),this.adsBlend<.001&&(this.adsBlend=0),this.reloading){this.reloadTime+=t;const C=this.reloadTime/this.reloadDuration;if(this.reloadPhase===-1&&C>.22&&(this.reloadPhase=0,this.audio.reloadStep(1)),!this.ammoApplied&&C>.58){this.ammoApplied=!0;const y=this.magSize-this.mag,S=Math.min(y,this.reserve);this.mag+=S,this.reserve-=S,this.audio.reloadStep(2),this.cb.onAmmoChange&&this.cb.onAmmoChange(this.getAmmoText())}C>=1&&(this.reloading=!1,this.reloadTime=0,this.reloadPhase=-1,this.cb.onReloadEnd&&this.cb.onReloadEnd());const I=Pe.smoothstep(C,.1,.35)*(1-Pe.smoothstep(C,.38,.55));this.magMesh.position.y=this.magHome.y-I*.28,this.magMesh.position.z=this.magHome.z-I*.05,this.magMesh.rotation.x=I*.8}this.recoil+=(0-this.recoil)*Math.min(1,t*16),this.recoilRot+=(0-this.recoilRot)*Math.min(1,t*12),this.kickSide+=(0-this.kickSide)*Math.min(1,t*10),this.lookSwayX+=(Pe.clamp(-r*.02,-.035,.035)-this.lookSwayX)*Math.min(1,t*9),this.lookSwayY+=(Pe.clamp(-a*.02,-.03,.03)-this.lookSwayY)*Math.min(1,t*9),e&&i&&(this.bobTime+=t*(n?11:7.5));const l=(e&&i?n?.017:.009:0)*(1-this.adsBlend*.82),h=Math.sin(this.bobTime)*l,d=Math.abs(Math.cos(this.bobTime))*l*.9,m=Math.sin(performance.now()*.0012)*.0025*(1-this.adsBlend*.7),u=so,_=Og;let g=Pe.lerp(u.x,_.x,this.adsBlend),f=Pe.lerp(u.y,_.y,this.adsBlend),p=Pe.lerp(u.z,_.z,this.adsBlend);this.sprinting&&(g=Pe.lerp(g,ro.x,.7),f=Pe.lerp(f,ro.y,.7),p=Pe.lerp(p,ro.z,.7)),g+=h+this.lookSwayX+this.kickSide,f+=d+m+this.lookSwayY,p+=this.recoil;let w=ms.x-this.recoilRot+this.lookSwayY*.5+(n?.32:0),v=ms.y+this.lookSwayX*1.6+(n?.16:0),x=ms.z+this.kickSide*1.6+(n?.22:0);if(this.reloading){const C=Math.min(1,this.reloadTime/.3),I=Math.min(1,(this.reloadTime-1.45)/.35),y=Oc(C)*(1-Oc(I));g=Pe.lerp(g,.13,y),f=Pe.lerp(f,-.31,y),p=Pe.lerp(p,-.34,y),w=Pe.lerp(w,ao.x,y),v=Pe.lerp(v,ao.y,y),x=Pe.lerp(x,ao.z,y)}const A=1-Math.pow(8e-4,t);this.group.position.x+=(g-this.group.position.x)*A*1.6,this.group.position.y+=(f-this.group.position.y)*A*1.6,this.group.position.z+=(p-this.group.position.z)*A*1.6,this.group.rotation.x+=(w-this.group.rotation.x)*A*1.3,this.group.rotation.y+=(v-this.group.rotation.y)*A*1.3,this.group.rotation.z+=(x-this.group.rotation.z)*A*1.3;const E=this.ads?40:55;Math.abs(this.viewCamera.fov-E)>.05&&(this.viewCamera.fov+=(E-this.viewCamera.fov)*Math.min(1,t*10),this.viewCamera.updateProjectionMatrix()),this.flashTime>0&&(this.flashTime-=t,this.flashTime<=0?(this.flash.visible=!1,this.flashGlow.intensity=0):this.flashGlow.intensity=18*(this.flashTime/this.flashLife)),this.reticle.material.opacity=this.adsBlend>.7?.95:.15,this.reticle.scale.setScalar(this.adsBlend>.7?.008:.006),this.crosshairSpread=Math.max(0,this.crosshairSpread-t*2.2),this.flashGlow.position.set(0,.06,-.5)}}function zc(s,t,e,n,i){const r=new T().subVectors(e,t),a=r.length(),o=new dt(new Es(n,Math.max(.02,a-n*2),4,8),i);return o.position.copy(t).addScaledVector(r,.5),o.quaternion.setFromUnitVectors(new T(0,1,0),r.clone().normalize()),s.add(o),o}function Oc(s){return Pe.smoothstep(s,0,1)}const kg=new T(0,1,0);function Bc(s,t,e){let n=(t-s+Math.PI)%(Math.PI*2)-Math.PI;return n<-Math.PI&&(n+=Math.PI*2),s+n*e}function jr(s,t,e,n,i){const r=new T().subVectors(t,s),a=r.length(),o=new dt(new Es(e,Math.max(.02,a-e*2),4,8),n);return o.position.copy(s).addScaledVector(r,.5),o.quaternion.setFromUnitVectors(kg,r.clone().normalize()),i.add(o),o}class Hg{constructor(t,e,n){this.scene=t,this.T=e,this.isMobile=n,this.root=new Oe,this.root.visible=!1,t.add(this.root),this.hitMeshes=[],this.state="idle",this.health=100,this.alive=!1,this.headshot=!1;const i=new Vt({color:8682075,roughness:.94,metalness:.02}),r=new Vt({color:6380614,roughness:.95,metalness:.02}),a=new Vt({color:3092520,roughness:.86,metalness:.05}),o=new Vt({color:2895398,roughness:.9,metalness:.04}),c=new Vt({color:10258531,roughness:.9,metalness:.03}),l=new Vt({color:5980466,roughness:.72,metalness:0}),h=new Vt({color:1908250,roughness:.94}),d=new Vt({color:1710101,roughness:.82,metalness:.08}),m=new Vt({color:2632488,roughness:.5,metalness:.75}),u=new Vt({color:2753538,emissive:13904402,emissiveIntensity:3,roughness:.2,metalness:.4}),_=new Vt({color:1382163,roughness:.7,metalness:.2});this.materials=[i,r,a,o,c,l,h,d,m,u,_],this.lensMat=u;const g=(B,Y,nt,W,ut,j=0,gt=0,It=0,jt=this.root)=>{const re=new dt(B,Y);return re.position.set(nt,W,ut),re.rotation.set(j,gt,It),re.castShadow=!0,re.receiveShadow=!0,jt.add(re),re},f=(B,Y,nt)=>(B.userData.enemy=this,B.userData.mult=Y,B.userData.part=nt,this.hitMeshes.push(B),B);this.legs=[];for(const B of[-1,1]){const Y=new Oe;Y.position.set(B*.115,.95,0),this.root.add(Y);const nt=g(new Es(.085,.3,4,8),r,0,-.18,0,0,0,0,Y);f(nt,.7,"leg"),g(new yt(.13,.1,.14),a,0,-.36,-.02,0,0,0,Y);const W=new Oe;W.position.set(0,-.4,0),Y.add(W);const ut=g(new pe(.11,.12,.09,2,.03),o,0,.02,-.06,0,0,0,W);f(ut,.55,"leg");const j=g(new Es(.072,.3,4,8),r,0,-.17,0,0,0,0,W);f(j,.7,"leg");const gt=g(new pe(.13,.11,.26,2,.03),d,0,-.37,-.05,0,0,0,W);f(gt,.6,"leg"),g(new yt(.1,.02,.02),c,0,-.33,.07,0,0,0,W),this.legs.push({hip:Y,knee:W,phase:B>0?0:Math.PI})}g(new pe(.3,.18,.21,2,.03),r,0,1.02,0),g(new yt(.32,.055,.23),a,0,1.08,0);for(let B=-1;B<=1;B++)g(new pe(.075,.1,.055,2,.012),o,B*.085,1,-.13);g(new pe(.13,.11,.06,2,.015),a,-.16,1,.02),this.torso=new Oe,this.torso.position.set(0,1.12,0),this.root.add(this.torso);const p=g(new pe(.36,.42,.23,3,.05),a,0,.2,0,0,0,0,this.torso);f(p,1,"body"),g(new pe(.3,.26,.2,2,.04),i,0,.39,.01,0,0,0,this.torso);for(const B of[-1,1]){const Y=g(new pe(.14,.12,.2,2,.035),o,B*.225,.38,0,0,0,B*.18,this.torso);f(Y,.8,"body")}for(let B=0;B<3;B++)g(new pe(.085,.1,.06,2,.012),o,-.1+B*.1,.17,-.145,0,0,0,this.torso);g(new pe(.1,.1,.045,2,.01),c,-.115,.31,-.145,0,0,0,this.torso),g(new yt(.07,.09,.05),_,.12,.3,-.14,0,0,0,this.torso),g(new Se(.005,.005,.16,5),m,.145,.41,-.14,0,0,.1,this.torso);for(const B of[-1,1])g(new yt(.045,.26,.02),c,B*.11,.34,-.135,0,0,B*.12,this.torso);const w=g(new pe(.3,.34,.16,2,.04),r,0,.23,.17,0,0,0,this.torso);f(w,1,"body"),g(new yt(.24,.02,.02),c,0,.1,.255,0,0,0,this.torso),g(new yt(.24,.02,.02),c,0,.34,.255,0,0,0,this.torso),this.headGroup=new Oe,this.headGroup.position.set(0,.55,0),this.torso.add(this.headGroup),g(new Se(.055,.06,.08,8),l,0,.015,0,0,0,0,this.headGroup);const v=g(new pn(.105,14,12),l,0,.11,0,0,0,0,this.headGroup);f(v,3.6,"head"),g(new pn(.108,14,10,0,Math.PI*2,0,Math.PI*.68),a,0,.105,0,0,0,0,this.headGroup),g(new pn(.135,16,10,0,Math.PI*2,0,Math.PI*.56),c,0,.145,-.005,0,0,0,this.headGroup).scale.set(1,.86,1.06),g(new gi(.132,.014,6,18),c,0,.115,0,Math.PI/2,0,0,this.headGroup),g(new yt(.06,.035,.05),m,0,.205,-.08,.2,0,0,this.headGroup);const A=g(new pe(.155,.045,.05,2,.012),m,0,.125,-.1,0,0,0,this.headGroup);A.scale.z=1;const E=g(new yt(.13,.028,.008),u,0,.125,-.128,0,0,0,this.headGroup);f(E,3.6,"head"),g(new yt(.02,.03,.03),m,.083,.13,-.085,0,0,0,this.headGroup),g(new yt(.02,.03,.03),m,-.083,.13,-.085,0,0,0,this.headGroup),this.weapon=new Oe,this.weapon.position.set(.055,.2,-.22),this.weapon.rotation.set(.03,-.03,0),this.torso.add(this.weapon),g(new yt(.06,.075,.34),m,0,0,-.06,0,0,0,this.weapon),g(new yt(.045,.05,.2),c,0,-.015,-.27,0,0,0,this.weapon),g(new Se(.012,.012,.26,8),m,0,.012,-.4,Math.PI/2,0,0,this.weapon),g(new Se(.018,.018,.05,8),m,0,.012,-.53,Math.PI/2,0,0,this.weapon),g(new yt(.045,.13,.07),m,0,-.11,-.08,.16,0,0,this.weapon),g(new yt(.05,.08,.15),c,0,-.005,.19,0,0,0,this.weapon),g(new yt(.055,.045,.12),m,0,.062,-.05,0,0,0,this.weapon),g(new Se(.023,.023,.06,10),m,0,.083,-.05,Math.PI/2,0,0,this.weapon),this.muzzle=new Ue,this.muzzle.position.set(0,.012,-.58),this.weapon.add(this.muzzle),this.flash=new mi(new ei({map:e.flash,color:16764810,transparent:!0,opacity:0,blending:xn,depthWrite:!1})),this.flash.scale.setScalar(.4),this.flash.position.set(0,.012,-.62),this.weapon.add(this.flash),this.arms=new Oe,this.torso.add(this.arms);const C=new T(.215,.36,0),I=new T(.15,.14,-.16),y=new T(.075,.055,-.26);jr(C,I,.062,i,this.arms),jr(I,y,.052,i,this.arms),g(new pn(.068,8,6),i,I.x,I.y,I.z,0,0,0,this.arms);const S=g(new pe(.07,.075,.08,2,.02),h,.075,.04,-.255,0,0,0,this.arms);f(S,.6,"arm");const D=new T(-.215,.36,0),N=new T(-.14,.12,-.2),k=new T(-.01,.09,-.34);jr(D,N,.06,i,this.arms),jr(N,k,.05,i,this.arms),g(new pn(.066,8,6),i,N.x,N.y,N.z,0,0,0,this.arms);const K=g(new pe(.065,.07,.09,2,.02),h,-.005,.075,-.34,0,0,0,this.arms);f(K,.6,"arm"),this.root.traverse(B=>{B.isMesh&&(B.castShadow=!0,B.receiveShadow=!0)}),this.flashTimer=0,this.hitFlash=0,this.deathTimer=0,this.deathRotation=0,this.removeTimer=0,this.walkPhase=Math.random()*10,this.shootCooldown=1+Math.random(),this.burst=0,this.burstTimer=0,this.strafeDir=Math.random()>.5?1:-1,this.strafeTimer=0,this.losTimer=0,this.hasLOS=!1,this.path=[],this.pathIndex=0,this.pathTimer=0,this.baseMatEmissive=this.materials.map(B=>B.emissive.clone())}spawn(t,e=1){this.root.visible=!0,this.root.position.copy(t),this.root.rotation.set(0,Math.random()*Math.PI*2,0),this.root.scale.setScalar(1),this.state="advance",this.alive=!0,this.health=100*(e>2?1.25:1),this.headshot=!1,this.deathTimer=0,this.removeTimer=0,this.shootCooldown=.8+Math.random()*1.4,this.burst=0,this.burstTimer=0,this.flashTimer=0,this.hitFlash=0,this.deathRotation=0,this.torso.rotation.set(0,0,0),this.torso.position.y=1.12;for(const n of this.materials)n.emissive.setHex(0),n.emissiveIntensity=1;this.lensMat.emissive.setHex(11541e3),this.lensMat.emissiveIntensity=2.2,this.hitMeshes.forEach(n=>{n.visible=!0,n.userData.enemy=this}),this.flash.material.opacity=0,this.speed=2.35+Math.random()*.45+e*.09,this.path.length=0,this.pathIndex=0,this.pathTimer=0}muzzleWorld(t){return this.muzzle.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.muzzle.matrixWorld)}takeDamage(t,e,n,i=!1){if(!this.alive)return!1;this.health-=t,this.hitFlash=.09;for(const r of this.materials)r!==this.lensMat&&(r.emissive.setHex(9051916),r.emissiveIntensity=.5);return this.health<=0?(this.die(i),!0):(this.torso.rotation.z=(Math.random()-.5)*.12,this.hitReaction={point:e.clone(),dir:n.clone(),headshot:i},!1)}die(t=!1){this.alive=!1,this.state="dead",this.headshot=t,this.health=0,this.deathTimer=0,this.removeTimer=5.5,this.burst=0,this.flash.material.opacity=0,this.fallSign=Math.random()>.5?1:-1,this.hitMeshes.forEach(e=>{e.userData.enemy=null})}update(t,e){if(this.state==="idle")return;if(!this.alive){this.updateDeath(t);return}const n=e.playerPos,i=n.x-this.root.position.x,r=n.z-this.root.position.z,a=Math.hypot(i,r),o=Math.atan2(-i,-r);this.losTimer-=t,this.losTimer<=0&&(this.losTimer=.22+Math.random()*.1,this.hasLOS=e.checkLOS(this.root.position,n));const c=this.hasLOS&&a<19;c||(this.pathTimer-=t,(this.pathTimer<=0||this.path.length===0)&&(this.path=e.world.findPath(this.root.position,n)||[],this.pathIndex=0,this.pathTimer=1.1+Math.random()*.5));let l=!1;if(c?0:1){const m=this.speed*(this.hasLOS?1.05:1.2)*(a>30?1.35:1);let u=i,_=r;if(this.path.length>0){for(;this.pathIndex<this.path.length-1;){const C=this.path[this.pathIndex];if(Math.hypot(C.x-this.root.position.x,C.z-this.root.position.z)>.65)break;this.pathIndex++}const x=this.path[this.pathIndex],A=x.x-this.root.position.x,E=x.z-this.root.position.z;Math.hypot(A,E)>.01&&(u=A,_=E)}const g=Math.hypot(u,_)||1;let f=u/g,p=_/g;for(const x of e.enemies){if(x===this||!x.alive)continue;const A=this.root.position.x-x.root.position.x,E=this.root.position.z-x.root.position.z,C=Math.hypot(A,E);C<1.3&&C>.001&&(f+=A/C*.8,p+=E/C*.8)}const w=Math.hypot(f,p)||1;f/=w,p/=w;const v=m*t;this.root.position.x+=f*v,this.root.position.z+=p*v,e.world.resolveCollisions(this.root.position,.38),l=!0,this.root.rotation.y=Bc(this.root.rotation.y,Math.atan2(-f,-p),Math.min(1,t*5))}else this.strafeTimer-=t,this.strafeTimer<=0&&(this.strafeTimer=1.2+Math.random()*1.6,this.strafeDir*=-1),a<20&&(this.root.position.x+=Math.cos(o)*this.strafeDir*t*.85,this.root.position.z+=-Math.sin(o)*this.strafeDir*t*.85,e.world.resolveCollisions(this.root.position,.38),l=!0),this.root.rotation.y=Bc(this.root.rotation.y,o,Math.min(1,t*7));this.walkPhase+=t*(l?7.5:2.2);const d=l?.65:.03;if(this.legs[0].hip.rotation.x=Math.sin(this.walkPhase)*d,this.legs[1].hip.rotation.x=Math.sin(this.walkPhase+Math.PI)*d,this.legs[0].knee.rotation.x=Math.max(0,-Math.sin(this.walkPhase))*(l?.9:0),this.legs[1].knee.rotation.x=Math.max(0,-Math.sin(this.walkPhase+Math.PI))*(l?.9:0),this.root.position.y=Math.abs(Math.sin(this.walkPhase))*(l?.035:.008),this.torso.rotation.z*=Math.max(0,1-t*10),this.torso.position.y=1.12+Math.sin(this.walkPhase*2)*(l?.012:.004),this.shootCooldown-=t,c&&this.shootCooldown<=0&&this.burst<=0&&(this.burst=1+Math.floor(Math.random()*3),this.burstTimer=.1,this.shootCooldown=2.4+Math.random()*2),this.burst>0&&(this.burstTimer-=t,this.burstTimer<=0&&(this.burst--,this.burstTimer=.13+Math.random()*.05,this.fireAt(e,a))),this.flashTimer>0&&(this.flashTimer-=t,this.flash.material.opacity=Math.max(0,this.flashTimer/.06),this.flash.scale.setScalar(.35+Math.random()*.2),this.flashTimer<=0&&(this.flash.material.opacity=0)),this.hitFlash>0&&(this.hitFlash-=t,this.hitFlash<=0))for(const m of this.materials)m!==this.lensMat&&(m.emissive.setHex(0),m.emissiveIntensity=1)}fireAt(t,e){const n=this.muzzleWorld(new T),i=t.playerPos,r=Pe.clamp(.42-e*.012,.07,.36)*(t.playerMoving?.82:1)*(t.playerSprinting?.72:1),a=Math.random()<r,o=new T(i.x,i.y-.15,i.z);a||(o.x+=(Math.random()-.5)*2.6,o.y+=(Math.random()-.3)*1.4,o.z+=(Math.random()-.5)*2.6),this.flashTimer=.06,this.flash.material.opacity=1,this.flash.scale.setScalar(.35+Math.random()*.2),t.effects.tracer(n,o),t.effects.sparks.spawn(n.x,n.y,n.z,(Math.random()-.5)*.4,.2,(Math.random()-.5)*.4,{life:.12,size:.05,color:[1,.7,.35],gravity:1,drag:.9});const c=Pe.clamp((this.root.position.x-i.x)/20,-1,1);if(t.audio.enemyShot(e,c),a){const l=3+Math.random()*3;t.damagePlayer(l,this.root.position)}else t.audio.suppression(c)}updateDeath(t){this.deathTimer+=t;const e=Math.min(1,this.deathTimer/.75),n=1-Math.pow(1-e,3);this.root.rotation.z=this.fallSign*n*Math.PI*.48,this.root.rotation.x=-n*.18,this.root.position.y=n*.06,this.deathTimer>1.2&&(this.root.position.y-=t*.04),this.removeTimer-=t,this.removeTimer<=0&&(this.state="idle",this.root.visible=!1)}dispose(){this.scene.remove(this.root)}}class Vg{constructor(t,e,n,i,r,a,o){this.scene=t,this.world=e,this.effects=n,this.audio=i,this.isMobile=a,this.cb=o,this.maxEnemies=a?8:10,this.pool=[];for(let c=0;c<this.maxEnemies;c++)this.pool.push(new Hg(t,r,a));this.active=[],this.raycaster=new Th,this.tmpA=new T,this.tmpB=new T,this.tmpDir=new T,this.spawnQueue=0,this.spawnTimer=0,this.playerPos=new T,this.wave=1}reset(){for(const t of this.active)t.state="idle",t.alive=!1,t.root.visible=!1;this.active=[],this.spawnQueue=0,this.spawnTimer=0}get aliveCount(){let t=0;for(const e of this.active)e.alive&&t++;return t}get pendingCount(){return this.spawnQueue}queueWave(t,e){this.spawnQueue=t,this.spawnTimer=0,this.tier=e}spawnOne(t){const e=this.pool.find(a=>a.state==="idle");if(!e)return!1;let n=null,i=-1/0;for(const a of this.world.spawnPoints){const o=a.distanceTo(t);if(o<14)continue;const c=a.z<t.z-6?7:0;let l=-Math.abs(o-26)+c+Math.random()*8;for(const h of this.active){if(!h.alive)continue;const d=Math.hypot(h.root.position.x-a.x,h.root.position.z-a.z);d<6&&(l-=(6-d)*2.5)}l>i&&(i=l,n=a)}n||(n=this.world.spawnPoints[0]);const r=this.world.nearestWalkable(n.x,n.z);e.spawn(r,this.tier||1),this.active.push(e);for(let a=0;a<5;a++)this.effects.dust.spawn(r.x+(Math.random()-.5),.3+Math.random()*1.5,r.z+(Math.random()-.5),(Math.random()-.5)*.8,.2,(Math.random()-.5)*.8,{life:.8,size:.25,color:[.45,.4,.32],gravity:-.2,drag:.94,grow:2});return!0}update(t,e,n,i){this.playerPos.copy(e),this.spawnQueue>0&&(this.spawnTimer-=t,this.spawnTimer<=0&&(this.spawnOne(e)?(this.spawnQueue--,this.spawnTimer=.7+Math.random()*1.2):this.spawnTimer=.3));const r={playerPos:e,playerMoving:n,playerSprinting:i,enemies:this.active,world:this.world,effects:this.effects,audio:this.audio,damagePlayer:(a,o)=>this.cb.onPlayerDamage(a,o),checkLOS:(a,o)=>this.checkLOS(a,o)};for(const a of this.active)a.state!=="idle"&&a.update(t,r);this.active=this.active.filter(a=>a.state!=="idle")}checkLOS(t,e){this.tmpA.set(t.x,1.55,t.z),this.tmpB.copy(e),this.tmpDir.subVectors(this.tmpB,this.tmpA);const n=this.tmpDir.length();return n<.5?!0:(this.tmpDir.normalize(),this.raycaster.set(this.tmpA,this.tmpDir),this.raycaster.far=n-.4,this.raycaster.intersectObjects(this.world.blockers,!1).length===0)}handleHit(t,e,n,i){const r=t.userData.enemy;if(!r||!r.alive)return null;const a=t.userData.mult||1,o=t.userData.part==="head",c=r.takeDamage(e*a,n,i,o);return{enemy:r,headshot:o,killed:c,part:t.userData.part}}getHitMeshes(){const t=[];for(const e of this.active)if(e.alive)for(const n of e.hitMeshes)n.userData.enemy&&t.push(n);return t}}class Gg{constructor(){this.isTouch=window.matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.keys=new Set,this.moveX=0,this.moveY=0,this.lookX=0,this.lookY=0,this.firing=!1,this.ads=!1,this.sprint=!1,this.jumpQueued=!1,this.reloadQueued=!1,this.pauseRequested=!1,this.pointerLocked=!1,this.enabled=!1,this.sensitivity=this.isTouch?.004:.00215,this.stickPointer=null,this.lookPointer=null,this.lookLast={x:0,y:0},this.adsToggle=!1,this.onReload=null,this.onPause=null,this.onFirstTouch=null,this.joyRadius=46,this.joyCenter={x:0,y:0},this._bound=[]}attach(t){this.canvas=t,this.stickZone=document.getElementById("stick-zone"),this.stickBase=document.getElementById("stick-base"),this.stickKnob=document.getElementById("stick-knob"),this.btnFire=document.getElementById("btn-fire"),this.btnAds=document.getElementById("btn-ads"),this.btnReload=document.getElementById("btn-reload"),this.btnJump=document.getElementById("btn-jump"),this.bind(document,"keydown",n=>{if(this.enabled){if(n.code==="Escape"){this.pauseRequested=!0,this.onPause?.();return}this.keys.add(n.code),n.code==="KeyR"&&this.requestReload(),n.code==="Space"&&(this.jumpQueued=!0,n.preventDefault()),n.code==="KeyQ"&&(this.ads=!this.ads)}}),this.bind(document,"keyup",n=>{this.keys.delete(n.code)}),this.bind(window,"blur",()=>{this.keys.clear(),this.firing=!1,this.ads=!1}),this.bind(t,"pointerdown",n=>{this.enabled&&n.pointerType==="mouse"&&!this.pointerLocked&&!this.isTouch&&t.requestPointerLock?.()}),this.bind(document,"pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===t,!this.pointerLocked&&this.enabled&&!this.isTouch&&(this.firing=!1,this.ads=!1)}),this.bind(t,"mousedown",n=>{!this.enabled||this.isTouch||(n.button===0&&(this.firing=!0),n.button===2&&(this.ads=!0))}),this.bind(window,"mouseup",n=>{n.button===0&&(this.firing=!1),n.button===2&&(this.ads=!1)}),this.bind(document,"mousemove",n=>{!this.enabled||this.isTouch||this.pointerLocked&&(this.lookX+=n.movementX*this.sensitivity,this.lookY+=n.movementY*this.sensitivity)}),this.bind(window,"contextmenu",n=>n.preventDefault()),this.bind(t,"pointerdown",n=>{!this.enabled||n.pointerType==="mouse"||this.lookPointer===null&&(this.lookPointer=n.pointerId,this.lookLast.x=n.clientX,this.lookLast.y=n.clientY,this.onFirstTouch?.())}),this.bind(window,"pointermove",n=>{if(this.enabled){if(n.pointerId===this.lookPointer){const i=n.clientX-this.lookLast.x,r=n.clientY-this.lookLast.y;this.lookLast.x=n.clientX,this.lookLast.y=n.clientY,this.lookX+=i*this.sensitivity,this.lookY+=r*this.sensitivity}this.stickPointer===n.pointerId&&this.updateStick(n.clientX,n.clientY)}}),this.bind(window,"pointerup",n=>{n.pointerId===this.lookPointer&&(this.lookPointer=null),n.pointerId===this.stickPointer&&this.endStick()}),this.bind(window,"pointercancel",n=>{n.pointerId===this.lookPointer&&(this.lookPointer=null),n.pointerId===this.stickPointer&&this.endStick()}),this.stickZone&&this.bind(this.stickZone,"pointerdown",n=>{if(!this.enabled)return;n.preventDefault(),this.stickPointer=n.pointerId;const i=this.stickBase.getBoundingClientRect();this.joyCenter.x=i.left+i.width/2,this.joyCenter.y=i.top+i.height/2,this.stickBase.classList.add("active"),this.updateStick(n.clientX,n.clientY),this.onFirstTouch?.()});const e=(n,i,r)=>{if(!n)return;this.bind(n,"pointerdown",o=>{o.preventDefault(),o.stopPropagation(),n.classList.add("pressed"),i()});const a=o=>{o.preventDefault(),n.classList.remove("pressed"),r?.()};this.bind(n,"pointerup",a),this.bind(n,"pointercancel",a),this.bind(n,"pointerleave",a)};e(this.btnFire,()=>{this.firing=!0},()=>{this.firing=!1}),e(this.btnAds,()=>{this.adsToggle=!this.adsToggle,this.ads=this.adsToggle,this.btnAds?.classList.toggle("ads-on",this.ads)}),e(this.btnReload,()=>this.requestReload()),e(this.btnJump,()=>{this.jumpQueued=!0})}requestReload(){this.reloadQueued=!0,this.onReload?.()}updateStick(t,e){let n=t-this.joyCenter.x,i=e-this.joyCenter.y;const r=Math.hypot(n,i),a=this.joyRadius;r>a&&(n=n/r*a,i=i/r*a),this.stickKnob.style.transform=`translate(${n}px, ${i}px)`;const o=n/a,c=i/a,l=.16,h=Math.hypot(o,c);if(h<l)this.moveX=0,this.moveY=0,this.sprint=!1;else{const d=(h-l)/(1-l);this.moveX=o/h*d,this.moveY=c/h*d,this.sprint=h>.88}}endStick(){this.stickPointer=null,this.moveX=0,this.moveY=0,this.sprint=!1,this.stickKnob.style.transform="translate(0px, 0px)",this.stickBase.classList.remove("active")}bind(t,e,n,i){t.addEventListener(e,n,i),this._bound.push([t,e,n,i])}reset(){this.keys.clear(),this.moveX=0,this.moveY=0,this.lookX=0,this.lookY=0,this.firing=!1,this.ads=!1,this.adsToggle=!1,this.sprint=!1,this.jumpQueued=!1,this.reloadQueued=!1,this.pauseRequested=!1,this.endStick(),this.btnAds?.classList.remove("ads-on")}setEnabled(t){this.enabled=t,t||this.reset()}consumeLook(){const t={x:this.lookX,y:this.lookY};return this.lookX=0,this.lookY=0,t}get moveVec(){let t=this.moveX,e=this.moveY;(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(e-=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(e+=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(t-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(t+=1);const n=Math.hypot(t,e);return n>1&&(t/=n,e/=n),{x:t,y:e}}get sprinting(){return this.sprint||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")}get jump(){return this.jumpQueued?(this.jumpQueued=!1,!0):!1}get reload(){return this.reloadQueued?(this.reloadQueued=!1,!0):!1}}class Wg{constructor(){this.el={hud:document.getElementById("hud"),healthBar:document.getElementById("health-bar"),healthValue:document.getElementById("health-value"),score:document.getElementById("score-value"),kills:document.getElementById("kills-value"),ammoMag:document.getElementById("ammo-mag"),ammoReserve:document.getElementById("ammo-reserve"),fireMode:document.getElementById("fire-mode"),status:document.getElementById("status-text"),killfeed:document.getElementById("killfeed"),hitmarker:document.getElementById("hitmarker"),crosshair:document.getElementById("crosshair"),damageFlash:document.getElementById("damage-flash"),damageIndicators:document.getElementById("damage-indicators"),reload:document.getElementById("reload-indicator"),reloadProgress:document.getElementById("reload-progress"),waveBanner:document.getElementById("wave-banner"),waveNumber:document.getElementById("wave-number"),waveSub:document.getElementById("wave-sub"),compass:document.getElementById("compass"),radar:document.getElementById("radar"),pauseBtn:document.getElementById("btn-pause"),touchUI:document.getElementById("touch-ui"),objectiveSub:document.querySelector(".objective-sub"),startScreen:document.getElementById("start-screen"),pauseScreen:document.getElementById("pause-screen"),deathScreen:document.getElementById("death-screen"),rotateHint:document.getElementById("rotate-hint")},this.compassW=340,this.compassH=30,this.radarW=132,this.radarH=132,this.canvasDpr=Math.min(2,window.devicePixelRatio||1),this.el.compass.width=this.compassW*this.canvasDpr,this.el.compass.height=this.compassH*this.canvasDpr,this.el.radar.width=this.radarW*this.canvasDpr,this.el.radar.height=this.radarH*this.canvasDpr,this.compassCtx=this.el.compass.getContext("2d"),this.radarCtx=this.el.radar.getContext("2d"),this.hitTimer=0,this.flashAmount=0,this.waveTimer=0,this.arrows=[],this.lastHealth=100,this.healthPulse=0,this.radarTime=0,this.compassTime=0}show(){this.el.hud.classList.remove("hidden")}hide(){this.el.hud.classList.add("hidden")}showTouch(t){t?this.el.touchUI.classList.remove("hidden"):this.el.touchUI.classList.add("hidden")}showPauseButton(t){this.el.pauseBtn.classList.toggle("hidden",!t)}setAmmo({mag:t,reserve:e}){this.el.ammoMag.textContent=String(t).padStart(2,"0"),this.el.ammoReserve.textContent=String(e),this.el.ammoMag.style.color=t===0?"#e2503f":t<=6?"#f2b45c":"#ffffff"}setHealth(t){const e=Math.max(0,Math.round(t));this.el.healthBar.style.width=`${Math.max(0,Math.min(100,e))}%`,this.el.healthBar.classList.toggle("low",e<=35),this.el.healthValue.textContent=String(e),e<this.lastHealth&&(this.flashAmount=Math.min(1,this.flashAmount+.42)),this.lastHealth=e,this.el.status.textContent=e<=0?"ABATIDO":e<=35?"CRÍTICO":(e<100,"EM COMBATE"),this.el.status.style.color=e<=35?"#e2503f":"#f2b45c"}setScore(t,e){this.el.score.textContent=t.toLocaleString("pt-BR"),this.el.kills.textContent=String(e)}setCrosshairAim(t){this.el.crosshair.classList.toggle("ads",t)}setObjective(t){this.el.objectiveSub.textContent=t}showWave(t,e="HOSTIS A CAMINHO"){this.el.waveNumber.textContent=String(t).padStart(2,"0"),this.el.waveSub.textContent=e,this.el.waveBanner.classList.add("show"),this.waveTimer=2.6}hideWave(){this.el.waveBanner.classList.remove("show")}hitmarker(t=!1,e=!1){this.el.hitmarker.classList.remove("show","head","kill"),this.el.hitmarker.offsetWidth,this.el.hitmarker.classList.add("show"),t&&this.el.hitmarker.classList.add("head"),e&&this.el.hitmarker.classList.add("kill"),this.hitTimer=e?.34:.18}killfeed(t=!1,e="M4A1"){const n=document.createElement("div");for(n.className="killfeed-entry"+(t?" head":""),n.innerHTML=`<span class="tag">${t?"HS":"KILL"}</span><span>VOCÊ</span><span style="opacity:.5">▸</span><span>${e}</span><span style="opacity:.5">▸</span><span style="color:rgba(255,255,255,.55)">HOSTIL</span>`,this.el.killfeed.appendChild(n);this.el.killfeed.children.length>5;)this.el.killfeed.firstChild.remove();setTimeout(()=>{n.classList.add("out"),setTimeout(()=>n.remove(),500)},3800)}damage(t,e,n,i){if(this.flashAmount=Math.min(1,this.flashAmount+t/26),!e)return;const r=e.x-i.x,a=e.z-i.z,o=-Math.sin(n),c=-Math.cos(n),l=Math.atan2(o*a-c*r,o*r+c*a),h=document.createElement("div");h.className="dmg-arrow",h.style.transform=`rotate(${l}rad)`,h.style.transition="opacity .85s ease-out",this.el.damageIndicators.appendChild(h),requestAnimationFrame(()=>{h.style.opacity="0"}),setTimeout(()=>h.remove(),900)}reloadStart(){this.el.reload.classList.add("show")}reloadProgress(t){this.el.reloadProgress.style.width=`${Math.min(1,t)*100}%`}reloadEnd(){this.el.reload.classList.remove("show"),this.el.reloadProgress.style.width="0%"}showDeath(t,e,n){document.getElementById("death-wave").textContent=String(t).padStart(2,"0"),document.getElementById("death-kills").textContent=String(e),document.getElementById("death-score").textContent=n.toLocaleString("pt-BR"),this.el.deathScreen.classList.remove("hidden")}showPause(t,e,n){document.getElementById("pause-wave").textContent=String(t).padStart(2,"0"),document.getElementById("pause-kills").textContent=String(e),document.getElementById("pause-score").textContent=n.toLocaleString("pt-BR"),this.el.pauseScreen.classList.remove("hidden")}hidePause(){this.el.pauseScreen.classList.add("hidden")}hideDeath(){this.el.deathScreen.classList.add("hidden")}update(t,{yaw:e,playerPos:n,enemies:i,world:r,health:a,reloading:o,reloadProgress:c,ads:l,moving:h}){this.hitTimer>0&&(this.hitTimer-=t,this.hitTimer<=0&&this.el.hitmarker.classList.remove("show","head","kill")),this.waveTimer>0&&(this.waveTimer-=t,this.waveTimer<=0&&this.hideWave()),this.flashAmount>0&&(this.flashAmount=Math.max(0,this.flashAmount-t*2.4),this.el.damageFlash.style.opacity=String(this.flashAmount)),o?(this.el.reload.classList.add("show"),this.el.reloadProgress.style.width=`${Math.min(1,c)*100}%`):this.el.reload.classList.remove("show"),this.radarTime+=t,this.compassTime+=t,this.radarTime>1/30&&(this.radarTime=0,this.drawRadar(e,n,i,r)),this.compassTime>1/30&&(this.compassTime=0,this.drawCompass(e,i,n))}drawCompass(t,e,n){const i=this.compassCtx,r=this.compassW,a=this.compassH;i.setTransform(this.canvasDpr,0,0,this.canvasDpr,0,0),i.clearRect(0,0,r,a);const o=(-t*180/Math.PI%360+360)%360,c=88,l=r/c;i.strokeStyle="rgba(255,255,255,0.22)",i.fillStyle="rgba(255,255,255,0.55)",i.textAlign="center",i.textBaseline="alphabetic",i.lineWidth=1;const h=Math.ceil((o-c/2)/5)*5;for(let d=h;d<=o+c/2;d+=5){const m=d-o,u=r/2+m*l,_=(d%360+360)%360,g=_%15===0;if(i.globalAlpha=g?.9:.4,i.beginPath(),i.moveTo(u,a-(g?9:6)),i.lineTo(u,a-2),i.stroke(),_%45===0){const f={0:"N",45:"NE",90:"E",135:"SE",180:"S",225:"SW",270:"W",315:"NW"};i.globalAlpha=1,i.fillStyle=_===0?"#f2b45c":"rgba(255,255,255,0.8)",i.font='600 12px "Barlow", sans-serif',i.fillText(f[_]||String(_),u,14)}else _%30===0&&(i.globalAlpha=.38,i.fillStyle="rgba(255,255,255,0.65)",i.font='9px "Share Tech Mono", monospace',i.fillText(String(_).padStart(3,"0"),u,13))}i.globalAlpha=1,i.fillStyle="#f2b45c",i.beginPath(),i.moveTo(r/2,18),i.lineTo(r/2-4,24),i.lineTo(r/2+4,24),i.closePath(),i.fill(),i.strokeStyle="rgba(242,180,92,0.35)",i.beginPath(),i.moveTo(r/2,24),i.lineTo(r/2,a),i.stroke();for(const d of e){if(!d.alive)continue;const m=d.root.position.x-n.x,u=d.root.position.z-n.z;if(Math.hypot(m,u)>48)continue;let g=(Math.atan2(m,-u)*180/Math.PI+360)%360-o;if(g=(g+540)%360-180,Math.abs(g)>c/2)continue;const f=r/2+g*l;i.fillStyle="rgba(255,80,60,0.95)",i.beginPath(),i.moveTo(f,2),i.lineTo(f-3.5,7),i.lineTo(f+3.5,7),i.closePath(),i.fill()}}drawRadar(t,e,n,i){const r=this.radarCtx,a=this.radarW,o=this.radarH;r.setTransform(this.canvasDpr,0,0,this.canvasDpr,0,0),r.clearRect(0,0,a,o);const c=a/2,l=o/2,h=34,d=(Math.min(a,o)/2-12)/h,m=Math.sin(t),u=Math.cos(t);r.save(),r.beginPath(),r.arc(c,l,Math.min(a,o)/2-4,0,Math.PI*2),r.clip(),r.strokeStyle="rgba(134,214,200,0.12)",r.lineWidth=1;for(let g=1;g<=3;g++)r.beginPath(),r.arc(c,l,(Math.min(a,o)/2-10)*(g/3),0,Math.PI*2),r.stroke();r.beginPath(),r.moveTo(c,8),r.lineTo(c,o-8),r.moveTo(8,l),r.lineTo(a-8,l),r.stroke(),r.fillStyle="rgba(180,190,180,0.13)";for(const g of i.colliders){const f=(g.minX+g.maxX)/2,p=(g.minZ+g.maxZ)/2,w=f-e.x,v=p-e.z;if(Math.hypot(w,v)>h)continue;const x=w*u-v*m,A=w*m+v*u,E=(g.maxX-g.minX)*d,C=(g.maxZ-g.minZ)*d;r.save(),r.translate(c+x*d,l+A*d),r.rotate(-t),r.fillRect(-E/2,-C/2,E,C),r.restore()}for(const g of n){if(!g.alive)continue;const f=g.root.position.x-e.x,p=g.root.position.z-e.z;if(Math.hypot(f,p)>h)continue;const v=f*u-p*m,x=f*m+p*u,A=c+v*d,E=l+x*d,C=r.createRadialGradient(A,E,0,A,E,10);C.addColorStop(0,"rgba(255,90,60,0.8)"),C.addColorStop(1,"rgba(255,90,60,0)"),r.fillStyle=C,r.beginPath(),r.arc(A,E,10,0,Math.PI*2),r.fill(),r.fillStyle="#ff6a4a",r.beginPath(),r.arc(A,E,2.6,0,Math.PI*2),r.fill()}r.font='11px "Share Tech Mono", monospace',r.textAlign="center",r.fillStyle="rgba(255,255,255,0.4)";const _=[["N",0,-1],["E",1,0],["S",0,1],["W",-1,0]];for(const[g,f,p]of _){const w=f*u-p*m,v=f*m+p*u,x=Math.min(a,o)/2-12;r.fillText(g,c+w*x,l+v*x+4)}r.fillStyle="#f2b45c",r.beginPath(),r.moveTo(c,l-8),r.lineTo(c-5,l+5),r.lineTo(c+5,l+5),r.closePath(),r.fill(),r.restore(),r.strokeStyle="rgba(134,214,200,0.35)",r.lineWidth=1.5,r.beginPath(),r.arc(c,l,Math.min(a,o)/2-4,-Math.PI*.65,-Math.PI*.35),r.stroke()}}const ct={mode:"menu",wave:1,score:0,kills:0,health:100,time:0,waveActive:!1,intermission:0,timeSinceDamage:0,deathTime:0,deathShown:!1,waveCompleteShown:!1},ke=window.matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,Xg=new URLSearchParams(location.search),kc=Xg.get("quality"),ca=kc==="low"||kc!=="high"&&qg();function qg(){try{const s=document.createElement("canvas"),t=s.getContext("webgl2")||s.getContext("webgl");if(!t)return!0;const e=t.getExtension("WEBGL_debug_renderer_info"),n=e?String(t.getParameter(e.UNMASKED_RENDERER_WEBGL)):"",i=t.getExtension("WEBGL_lose_context");return i&&i.loseContext(),/swiftshader|llvmpipe|software|basic render/i.test(n)}catch{return!1}}let ye,Fn,we,An,Hc,ki,Mn,Sn,_e,gn,an,ze,te,wl,or,_i,Uh,Kr,Vc=0;const Q={pos:new T(0,0,21),vel:new T,yaw:0,pitch:0,vY:0,grounded:!0,eye:1.72,bobTime:0,bobY:0,bobX:0,roll:0,distance:0,stepDist:0,recoilPitch:0,recoilYaw:0,shake:0,fov:66,lastHealthShown:100,moving:!1,sprinting:!1},Zr=new Th,Gc=new T;new T;const Ks=new T,Yg={onPlayerDamage:e_};function jg(){const s=document.getElementById("game-canvas");try{ye=new lg({canvas:s,antialias:!ca,powerPreference:"high-performance",stencil:!1})}catch(i){document.getElementById("boot-error").classList.remove("hidden"),console.error(i);return}if(!ye.capabilities.isWebGL2){document.getElementById("boot-error").classList.remove("hidden");return}ye.setPixelRatio(ca?1:Math.min(window.devicePixelRatio||1,ke?1.6:2)),ye.setSize(window.innerWidth,window.innerHeight),ye.outputColorSpace=qe,ye.toneMapping=nl,ye.toneMappingExposure=.9,ye.shadowMap.enabled=!0,ye.shadowMap.type=qc,ye.autoClear=!1,Fn=new Ko,we=new un(66,window.innerWidth/window.innerHeight,.05,700),we.rotation.order="YXZ",Fn.add(we),wl=new Ko,or=new un(52,window.innerWidth/window.innerHeight,.01,12),_g(ye),te=new Wg,ze=new Gg,an=new Ug,document.getElementById("device-tag").textContent=ke?"MOBILE / TABLET":"DESKTOP",ke&&(document.querySelectorAll(".desktop-only").forEach(i=>i.style.display="none"),document.querySelectorAll(".mobile-only").forEach(i=>i.style.display="flex"));const t=document.getElementById("btn-deploy"),e=t.querySelector(".deploy-label"),n=t.querySelector(".deploy-sub");e.textContent="CARREGANDO",n.textContent="PREPARANDO O SETOR",t.disabled=!0,Uh=new Eh,Kg().then(()=>{e.textContent="IMPLANTAR",n.textContent="TOQUE PARA INICIAR",t.disabled=!1,requestAnimationFrame(Oh)}).catch(i=>{console.error(i),document.getElementById("boot-error").classList.remove("hidden")})}async function Kg(){if(Kr=Lh(),Mn=await Lg(Fn,ye,{mobile:ke}),Fn.environment=Fn.environment,Sn=new zg(Fn,we,Kr,ke),!ca){const s=ye.getDrawingBufferSize(new Rt),t=new Pn(s.x,s.y,{type:Xn,samples:ke?0:4});An=new fg(ye,t),An.setPixelRatio(ye.getPixelRatio()),An.setSize(window.innerWidth,window.innerHeight),An.addPass(new pg(Fn,we)),Hc=new Ts(new Rt(window.innerWidth,window.innerHeight),ke?.24:.33,.62,.9),An.addPass(Hc),An.addPass(new gg),ki=new Dh(a_),ki.uniforms.resolution.value.set(s.x,s.y),An.addPass(ki)}_i=new vs(16760954,0,18,2),Fn.add(_i),_e=new Bg({viewScene:wl,viewCamera:or,camera:we,audio:an,effects:Sn,textures:Kr,envMap:Fn.environment,isMobile:ke,callbacks:{onShoot:zh,onRecoil:(s,t)=>{Q.recoilPitch+=s,Q.recoilYaw+=t},onAmmoChange:s=>te.setAmmo(s),onReloadStart:()=>te.reloadStart(),onReloadEnd:()=>te.reloadEnd(),onADS:s=>{te.setCrosshairAim(s),ke&&document.getElementById("btn-ads").classList.toggle("ads-on",s)},onMuzzleFlash:s=>{_i.position.copy(s),_i.intensity=55+Math.random()*25}}}),_e.group.visible=!1,gn=new Vg(Fn,Mn,Sn,an,Kr,ke,Yg),ze.onPause=lr,ze.onReload=()=>{ct.mode==="playing"&&_e.reload()},ze.onFirstTouch=()=>an.resume(),ze.attach(ye.domElement),ke||(ze.isTouch=!1),Zg(),$g(),Jg(),we.position.set(8,6,26),we.lookAt(0,1.5,-6),te.setAmmo({mag:30,reserve:120}),te.setHealth(100),te.setScore(0,0),te.update(0,{yaw:0,playerPos:Q.pos,enemies:[],world:Mn,health:100,reloading:!1,reloadProgress:0,ads:!1,moving:!1})}function Zg(){document.getElementById("btn-deploy").addEventListener("click",()=>{document.getElementById("btn-deploy").disabled||Nh()}),document.getElementById("btn-pause").addEventListener("click",()=>{ct.mode==="playing"&&lr()}),document.getElementById("btn-resume").addEventListener("click",()=>{Fh()}),document.getElementById("btn-restart").addEventListener("click",()=>{tl()}),document.getElementById("btn-redeploy").addEventListener("click",()=>{tl()});const s=document.getElementById("rotate-hint");s.addEventListener("click",()=>s.classList.add("hidden")),ma()}function ma(){const s=document.getElementById("rotate-hint");if(!s)return;const t=ke&&window.matchMedia("(orientation: portrait)").matches&&window.innerWidth<=820;s.classList.toggle("hidden",!t)}function $g(){const s=()=>{const t=window.innerWidth,e=window.innerHeight;we.aspect=t/e,we.updateProjectionMatrix(),or.aspect=t/e,or.updateProjectionMatrix(),ye.setSize(t,e),An&&(An.setPixelRatio(ye.getPixelRatio()),An.setSize(t,e)),ki&&ki.uniforms.resolution.value.set(t*ye.getPixelRatio(),e*ye.getPixelRatio()),Sn.setScale(ye.domElement.height,we.fov)};window.addEventListener("resize",s),window.addEventListener("orientationchange",s),s(),ma()}function Jg(){document.addEventListener("visibilitychange",()=>{document.hidden&&ct.mode==="playing"&&lr()}),document.addEventListener("pointerlockchange",()=>{ct.mode==="playing"&&!ke&&document.pointerLockElement===null&&lr()})}function Nh(){if(an.init(),ke){const s=document.documentElement;s.requestFullscreen&&s.requestFullscreen().catch(()=>{}),screen.orientation?.lock&&screen.orientation.lock("landscape").catch(()=>{})}else ye.domElement.requestPointerLock?.();document.getElementById("start-screen").classList.add("hidden"),document.getElementById("btn-pause").classList.remove("hidden"),te.show(),te.showTouch(ke),te.setAmmo({mag:_e.mag,reserve:_e.reserve}),te.setHealth(100),te.setScore(0,0),ze.setEnabled(!0),Q.pos.copy(Mn.playerSpawn),Q.pos.y=0,Q.yaw=0,Q.pitch=-.02,Q.vY=0,Q.grounded=!0,ct.mode="playing",ct.wave=0,ct.score=0,ct.kills=0,ct.health=100,ct.timeSinceDamage=0,_e.group.visible=!0,_e.reset(),gn.reset(),ze.sensitivity=ke?.004:.00215,bl(1),ma()}function bl(s){ct.wave=s,ct.waveActive=!0,ct.waveCompleteShown=!1,ct.intermission=0;const t=4+Math.min(11,Math.floor(s*1.6));gn.queueWave(t,s),te.showWave(s,`${t} HOSTIS A CAMINHO`),te.setObjective(`HOSTIS RESTANTES: ${t}`),an.waveStart()}function Qg(){ct.waveActive=!1,ct.intermission=5.5,ct.waveCompleteShown=!0,ct.score+=250*ct.wave,te.setScore(ct.score,ct.kills),te.showWave(ct.wave,"SETOR LIMPO"),te.setObjective("PREPARANDO PRÓXIMA ONDA"),an.waveClear(),_e.refillReserve(60),ct.health=Math.min(100,ct.health+25),te.setHealth(ct.health)}function lr(){ct.mode==="playing"&&(ct.mode="paused",ze.setEnabled(!1),_e.stopFire(),ke||document.exitPointerLock?.(),te.showPause(ct.wave,ct.kills,ct.score))}function Fh(){ct.mode==="paused"&&(ct.mode="playing",ze.setEnabled(!0),te.hidePause(),ke||ye.domElement.requestPointerLock?.(),an.ui())}function tl(){te.hidePause(),te.hideDeath(),gn.reset(),_e.reset(),Q.pos.copy(Mn.playerSpawn),Q.pos.y=0,Q.yaw=0,Q.pitch=-.02,Q.vY=0,Q.recoilPitch=0,Q.recoilYaw=0,Q.grounded=!0,ct.health=100,ct.score=0,ct.kills=0,ct.timeSinceDamage=0,ct.deathShown=!1,ct.deathTime=0,ct.waveActive=!1,ct.intermission=0,te.setAmmo({mag:_e.mag,reserve:_e.reserve}),te.setHealth(100),te.setScore(0,0),te.reloadEnd(),te.hideDeath(),te.show(),te.showTouch(ke),document.getElementById("btn-pause").classList.remove("hidden"),ze.setEnabled(!0),ke?an.resume():ye.domElement.requestPointerLock?.(),ct.mode="playing",bl(1),ma()}function t_(){ct.mode==="playing"&&(ct.mode="dead",ct.deathTime=0,ze.setEnabled(!1),_e.stopFire(),_e.trigger=!1,te.showTouch(!1),document.getElementById("btn-pause").classList.add("hidden"),ke||document.exitPointerLock?.(),te.showDeath(ct.wave,ct.kills,ct.score),ct.deathShown=!0)}function e_(s,t){ct.mode==="playing"&&(ct.health=Math.max(0,ct.health-s),ct.timeSinceDamage=0,Q.shake=Math.min(.045,Q.shake+.018),te.setHealth(ct.health),te.damage(s,t,Q.yaw,Q.pos),an.hurt(),ct.health<=0&&t_())}function zh(s,t,e){Ks.copy(t).normalize(),Zr.set(s,Ks),Zr.near=.1,Zr.far=240;const i=gn.getHitMeshes().concat(Mn.blockers),r=Zr.intersectObjects(i,!1);let a=null,o=null;for(const c of r)if(c.object.visible){if(c.object.userData.enemy||c.object.userData.part){o=c;break}o=c;break}if(o){if(a=o.point,o.object.userData.enemy){const c=gn.handleHit(o.object,34,o.point,Ks);if(c&&(Sn.bloodHit(o.point,Ks),te.hitmarker(c.headshot,c.killed),an.hitmarker(c.headshot),c.killed)){an.kill();const l=c.headshot?150:100;ct.score+=l,ct.kills++,te.setScore(ct.score,ct.kills),te.killfeed(c.headshot);for(let h=0;h<6;h++)Sn.dust.spawn(o.point.x,o.point.y,o.point.z,(Math.random()-.5)*1.2,Math.random()*1.2,(Math.random()-.5)*1.2,{life:.7,size:.08,color:[.3,.05,.02],gravity:.4,drag:.93,grow:2})}}else{const c=o.face?o.face.normal.clone().transformDirection(o.object.matrixWorld):new T(0,1,0),l=o.object.material,h=l&&l.metalness>.4?"metal":"concrete";Sn.impact(o.point,c,h),an.impact((Math.random()-.5)*.4)}Sn.tracer(e,a)}else a=s.clone().addScaledVector(Ks,120),Sn.tracer(e,a)}function n_(s){const t=ze.consumeLook(),e=_e.ads?.55:1;Q.yaw-=t.x*e,Q.pitch-=t.y*e,Q.pitch=Pe.clamp(Q.pitch,-1.42,1.42),Q.yaw>Math.PI&&(Q.yaw-=Math.PI*2),Q.yaw<-Math.PI&&(Q.yaw+=Math.PI*2);const n=ze.moveVec,i=-n.y,r=(ze.sprinting||ke&&ze.sprint)&&!_e.ads&&i>.25,a=_e.ads?2.4:r?7.1:4.5;let o=-Math.sin(Q.yaw)*i+Math.cos(Q.yaw)*n.x,c=-Math.cos(Q.yaw)*i-Math.sin(Q.yaw)*n.x;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const h=Q.grounded?13:4;Q.vel.x+=(o*a-Q.vel.x)*Math.min(1,s*h),Q.vel.z+=(c*a-Q.vel.z)*Math.min(1,s*h),ze.jump&&Q.grounded&&(Q.vY=4.6,Q.grounded=!1),Q.vY-=13.5*s,Q.pos.x+=Q.vel.x*s,Q.pos.z+=Q.vel.z*s,Q.pos.y+=Q.vY*s,Q.pos.y<=0&&(!Q.grounded&&Q.vY<-3&&(Q.shake=Math.min(.05,Q.shake+.012)),Q.pos.y=0,Q.vY=0,Q.grounded=!0),Mn.resolveCollisions(Q.pos,.34);const d=Math.hypot(Q.vel.x,Q.vel.z);Q.moving=d>.35,Q.sprinting=r&&Q.moving,Q.grounded&&Q.moving&&(Q.bobTime+=s*(Q.sprinting?10.5:7.2)*Math.min(1.2,d/4),Q.stepDist+=d*s,Q.stepDist>(Q.sprinting?2:1.55)&&(Q.stepDist=0,an.footstep(Q.sprinting),Q.shake=Math.min(.02,Q.shake+.002)));const m=Q.grounded&&Q.moving?Q.sprinting?1.35:.9:0;if(Q.bobY=Math.abs(Math.sin(Q.bobTime))*.026*m,Q.bobX=Math.sin(Q.bobTime)*.017*m,Q.roll=-n.x*.012*(_e.ads?.35:1),Q.recoilPitch*=Math.pow(.002,s),Q.recoilYaw*=Math.pow(.002,s),Q.shake*=Math.pow(5e-4,s),_e.trigger=ze.firing,_e.update(s,{moving:Q.moving,sprinting:Q.sprinting,grounded:Q.grounded,lookX:t.x,lookY:t.y}),ze.reload&&_e.reload(),ct.timeSinceDamage+=s,ct.timeSinceDamage>4.6&&ct.health<100&&ct.mode==="playing"){ct.health=Math.min(100,ct.health+9*s);const v=Math.round(ct.health);v!==Q.lastHealthShown&&(Q.lastHealthShown=v,te.setHealth(ct.health))}const u=_e.ads?46:Q.sprinting?70:66;Q.fov+=(u-Q.fov)*Math.min(1,s*9),we.fov=Q.fov,we.updateProjectionMatrix();const _=_e.adsBlend*.015,g=Q.eye+Q.pos.y+Q.bobY-_;we.position.set(Q.pos.x+Q.bobX*.4,g,Q.pos.z);const f=Q.shake,p=(Math.random()-.5)*f,w=(Math.random()-.5)*f;if(we.position.x+=p,we.position.y+=w,we.rotation.set(Q.pitch+Q.recoilPitch+(Math.random()-.5)*f*.6,Q.yaw+Q.recoilYaw+(Math.random()-.5)*f*.6,Q.roll+(Math.random()-.5)*f*.4),ze.ads!==_e.ads&&_e.setADS(ze.ads),_i.intensity>.01&&(_i.intensity*=Math.pow(1e-4,s)),ct.waveActive){const v=gn.aliveCount+gn.pendingCount;te.setObjective(`HOSTIS RESTANTES: ${v}`)}}function i_(s){ct.waveActive&&gn.aliveCount===0&&gn.pendingCount===0&&Qg(),!ct.waveActive&&ct.intermission>0&&(ct.intermission-=s,ct.intermission<=0&&bl(ct.wave+1))}function s_(s){Vc+=s;const t=Vc;we.position.set(Math.cos(t*.055)*25,5.4+Math.sin(t*.07)*1.2,Math.sin(t*.055)*25),we.lookAt(0,1.4,-5),we.fov=55,we.updateProjectionMatrix()}function r_(s){ct.deathTime+=s;const t=Math.min(1,ct.deathTime/1.4),e=t*t;we.position.y=Q.eye-e*1.25,we.rotation.set(Q.pitch-e*.5,Q.yaw+e*.25,Q.roll+e*1.05),_i.intensity>.01&&(_i.intensity*=Math.pow(1e-4,s))}let Wc=100;function Oh(){requestAnimationFrame(Oh);const s=Math.min(.05,Uh.getDelta());ct.time+=s,ct.mode==="menu"?(s_(s),Mn.update(s,we),Sn.update(s)):ct.mode==="playing"?(n_(s),i_(s),gn.update(s,Gc.set(Q.pos.x,Q.eye+Q.pos.y,Q.pos.z),Q.moving,Q.sprinting),ze.pauseRequested&&(ze.pauseRequested=!1),Sn.update(s),Mn.update(s,we),te.update(s,{yaw:Q.yaw,playerPos:Q.pos,enemies:gn.active,world:Mn,health:ct.health,reloading:_e.reloading,reloadProgress:_e.reloadTime/_e.reloadDuration,ads:_e.ads,moving:Q.moving}),Math.round(ct.health)!==Wc&&(Wc=Math.round(ct.health),te.setHealth(ct.health)),ct.mode==="playing"&&an.enabled&&Math.random()<s*.035&&an.distantBattle()):ct.mode==="paused"?(Mn.update(s*.15,we),Sn.update(s*.15)):ct.mode==="dead"&&(r_(s),gn.update(s*.25,Gc.set(Q.pos.x,Q.eye+Q.pos.y,Q.pos.z),!1,!1),Sn.update(s*.4),Mn.update(s*.3,we)),ki&&(ki.uniforms.time.value=ct.time),ye.setRenderTarget(null),An?An.render(s):(ye.clear(),ye.render(Fn,we)),ct.mode!=="menu"&&(ye.clearDepth(),ye.render(wl,or))}const a_={uniforms:{tDiffuse:{value:null},time:{value:0},resolution:{value:new Rt(1,1)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 col = src.rgb;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, 1.13);
      col = (col - 0.5) * 1.075 + 0.5;
      col += vec3(-0.010, 0.002, 0.014) * (1.0 - smoothstep(0.02, 0.42, l));
      col += vec3(0.010, 0.003, -0.006) * smoothstep(0.55, 1.0, l);
      float d = distance(vUv, vec2(0.5));
      col *= 1.0 - 0.26 * smoothstep(0.3, 0.92, d);
      col += (rand(vUv * resolution + time) - 0.5) * 0.022;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `};jg();window.__dustline={get quality(){return ca?"low":"high"},get state(){return ct},get player(){return Q},get camera(){return we},get weapon(){return _e},get input(){return ze},get hud(){return te},handleShot:zh,get enemies(){return gn},get world(){return Mn},startGame:Nh,restartGame:tl,pauseGame:lr,resumeGame:Fh};
