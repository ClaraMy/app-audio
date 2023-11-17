uniform sampler2D uMap;

varying vec2 vUv;

void main(){
    vec4 texture = texture2D(uMap, vUv);

    gl_FragColor = texture;
//   gl_FragColor = vec4(vUv, 0.0, 0.0, 255.0);
}