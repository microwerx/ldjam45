#version 300 es
precision highp float;

uniform sampler2D MapKd;
uniform sampler2D MapKs;
uniform sampler2D MapNormal;
uniform float MapKdMix;
uniform float MapKsMix;
uniform float MapNormalMix;
uniform vec3 Kd;
uniform vec3 Ks;

uniform vec3 SunDirTo;
uniform vec3 SunE0;

// These MUST match the vertex shader
in vec3 vPosition;
in vec3 vNormal;
in vec3 vTexcoord;
in vec3 vColor;

out vec4 oFragColor;

void main() {
    // set to white
    vec3 color = vec3(0.0);
    float alpha = 1.0;
    if (MapKdMix > 0.0) {
        vec4 map = texture(MapKd, vTexcoord.st);
        color += map.rgb;    
        alpha = map.a;
    } else {
        color += vColor;
    }
    oFragColor = vec4(color, alpha);
}
