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

        // update physics locations
        let starIndex = 0;
        let planetoidIndex = 0;
        for (let j = 0; j < this.common.numRows; j++) {
            for (let i = 0; i < this.common.numCols; i++) {
                switch (cells[j][i]) {
                    case NOTHING:
                        break;
                    case STAR:
                        gobjs[StarIndex + starIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        starIndex++;
                        break;
                    case PLANETOID:
                        gobjs[PlanetoidCount + planetoidIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        planetoidIndex++;
                        break;
                    default:
                        break;
                }
            }
        }

        // update star physics
        for (let i = 0; i < this.common.MaxStars; i++) {
            let star = gobjs[StarIndex + i];

            // disable non-existent stars
            if (i >= starIndex) {
                star.active = false;
                continue;
            }

            star.active = true;
            star.resetForces();
            star.update(this.xor.dt);
        }

        // update planetoid physics
        for (let i = 0; i < this.common.MaxPlanetoids; i++) {
            let planetoid = gobjs[PlanetoidIndex + i];

            // disable non-existent planetoids
            if (i >= this.common.numPlanetoids) {
                planetoid.active = false;
                continue;
            }


            planetoid.active = true;
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

            planetoid.update(this.xor.dt);
        }

        // update player physics
        for (let i = PlayerIndex; i <= PlayerMaxIndex; i++) {
            let player = gobjs[PlayerIndex + i];
            player.active = true;
            player.resetForces();

            // TODO: allow player to interact with missiles and other players

            // allow player to interact with planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                let planetoid = gobjs[PlanetoidIndex + j];
                player.calcInteractionForce(planetoid);
            }

            // allow player to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                player.calcInteractionForce(star);
            }

            player.update(this.xor.dt);
        }
    }
}