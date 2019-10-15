/// <reference path="./CommonGame.ts" />

class EndoSystemGame {
    constructor(
        public xor: LibXOR,
        public common: CommonGame) {

    }

    init() {
        this.reset();
    }

    reset() {

    }

    update() {
        let gobjs = this.common.gobjs;
        let cells = this.common.cells;

        if (gobjs.length < MaxGObjects) return;

        // update star physics
        for (let i = 0; i < StarCount; i++) {
            let star = gobjs[StarIndex + i];

            // disable non-existent stars
            if (i >= this.common.numStars) {
                star.active = false;
                continue;
            }

            star.active = true;
            star.resetForces();
            star.update(this.xor.dt);
        }

        // update planetoid physics
        for (let i = 0; i < PlanetoidCount; i++) {
            let planetoid = gobjs[PlanetoidIndex + i];

            // disable non-existent planetoids
            if (i >= this.common.numPlanetoids) {
                planetoid.active = false;
                continue;
            }

            if (planetoid.life < 0) planetoid.active = false;
            if (!planetoid.active) continue;

            // planetoid.active = true;
            planetoid.resetForces();

            // allow planetoids to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                planetoid.calcInteractionForce(star, 10.0);
            }

            // allow planetoids to interact with other planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                if (j == i) continue;
                let otherPlanetoid = gobjs[PlanetoidIndex + j];
                planetoid.calcInteractionForce(otherPlanetoid, 10.0);
            }

            // allow planetoids to interact with creation stars
            for (let j = 0; j < this.common.numCreationStars; j++) {
                if (j == i) continue;
                let star = gobjs[CreationStarIndex + j];
                planetoid.calcInteractionForce(star, 10.0);
            }

            planetoid.update(this.xor.dt);
        }

        for (let i = 0; i < CreationStarCount; i++) {
            let creationStar = gobjs[CreationStarIndex + i];
            if (i >= this.common.numCreationStars) {
                creationStar.active = false;
                continue;
            }

            // TODO: CHANGE when creation stars can be obtained
            // if (!star.active) return;
            creationStar.resetForces();

            // allow creation star to interact with planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                let planetoid = gobjs[PlanetoidIndex + j];
                creationStar.calcInteractionForce(planetoid);
            }

            // allow creation star to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                creationStar.calcInteractionForce(star);
            }
            creationStar.update(this.xor.dt);
        }

        // update player physics
        for (let i = 0; i < PlayerCount; i++) {
            let player = gobjs[PlayerIndex + i];
            if (!player.active) continue;

            // player.active = true;
            player.resetForces();

            // TODO: allow player to interact with creation stars
            for (let j = 0; j < this.common.numCreationStars; j++) {
                let star = gobjs[CreationStarIndex + j];
                if (!star.active) continue;
                player.calcInteractionForce(star);

                if (player.distanceBetween(star) < 0) {
                    star.active = false;
                    this.common.sfx(SOUND_CREATIONSTAR_DEAD);
                    this.common.creationStarsCollected++;
                }
            }

            // allow player to interact with planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                let planetoid = gobjs[PlanetoidIndex + j];
                player.calcInteractionForce(planetoid);

                if (!planetoid.active) continue;

                if (player.distanceBetween(planetoid) < 0) {
                    planetoid.life -= this.xor.dt;
                    if (planetoid.life > 0) {
                        this.common.sfx(SOUND_PLAYER_MINING);
                    } else {
                        planetoid.active = false;
                        this.common.sfx(SOUND_PLAYER_DEAD);
                    }
                    this.common.gold += this.xor.dt;
                }
            }

            // allow player to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                player.calcInteractionForce(star);

                if (player.distanceBetween(star) < 0) {
                    player.life -= player.burn(star) / 100.0 * this.xor.dt;
                    if (player.life < 0) {
                        this.common.sfx(SOUND_PLAYER_DEAD);
                        player.active = false;
                    } else {
                        this.common.sfx(SOUND_PLAYER_DYING);
                    }
                }
            }

            player.update(this.xor.dt);
        }
    }
}