if (!localStorage.getItem('highScore')) {} else {
    var highScore = localStorage.getItem('highScore');
    document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}
 document.getElementById("startGame").onclick = function() { createGame() };


function createGame() {
    var flag = true;
    var parent = document.getElementById("gameSpace");
    var child = document.getElementById("startScreen");
    parent.removeChild(child);
    child = document.createElement("CANVAS");
    child.setAttribute("id", "game");
    child.setAttribute("width", 1420);
    child.setAttribute("height", 800);
    child.setAttribute("class", "w3-animate-bottom");
    parent.appendChild(child);
    console.log(child.id);
    document.getElementById("gameSpace").id = "gameBackground";


    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var score = 0;
    var frate = 8;
    var counter = 0;
    const height = 800;
    const width = 1420;
    var gunImg = new Image();
    var bulletImg = new Image();
    bulletImg.onload = function() {};
    bulletImg.src = 'laser.png';

    gunImg.onload = function() {};
    gunImg.src = 'gunSmall.png';

    var Gun = {
        gunHeight: 130,
        gunWidth: 100,
        gunX: 665,

        drawGun: function() {

            ctx.drawImage(gunImg, this.gunX, height - this.gunHeight);
            ctx.font = '40px serif';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(score, this.gunX + this.gunWidth / 2, height - 20, );
            ctx.closePath();
        }


    }
    var rightPressed = false;
    var leftPressed = false;


    function bullet() {
        var length = 0;
        var head = null;

        var Node = function() {
            this.bulletX = Gun.gunX + Gun.gunWidth / 2;
            this.bulletY = height - Gun.gunHeight;
            this.next = null;
        };

        this.size = function() {
            return length;
        };

        this.head = function() {
            return head;
        };
        this.decreaseLength = function() {
            length--;
        };

        this.changeHead = function(newHead) {
            head = newHead.next;
        };
        this.headNull = function() {
            head = null;
        };

        this.checkHead = function(check) {
            if (head === check)
                return true;
            else
                return false;
        };

        this.add = function() {
            var node = new Node();
            if (head === null) {
                head = node;
            } else {
                var currentNode = head;

                while (currentNode.next) {
                    currentNode = currentNode.next;
                }

                currentNode.next = node;
            }

            length++;
        };

        this.isEmpty = function() {
            return length === 0;
        };

        this.moveY = function() {
            var currentNode = head;
            while (currentNode) {
                currentNode.bulletY -= 16;
                currentNode = currentNode.next;
            }
        };


        this.overflow = function() {
            var currentNode = head;
            if (length <= 0) {} else {
                if (currentNode.bulletY < 0) {
                    head = currentNode.next;
                    length--;
                }
            }
        }
        this.size = function() {
            return length;
        };

        this.head = function() {
            return head;
        };


        this.elementAt = function(index) {
            var currentNode = head;
            var count = 0;
            while (count < index) {
                count++;
                currentNode = currentNode.next;
            }
            return currentNode.index;
        };
        this.drawBullet = function() {
            var currentNode = head;
            while (currentNode) {
                ctx.drawImage(bulletImg, currentNode.bulletX, currentNode.bulletY)
                currentNode = currentNode.next;
            };

        }

    }

    function boulder() {
        var length = 0;
        var head = null;
        var last = null;

        var Node = function(x, value, y) {
            this.boulderX = x;
            this.boulderY = y;
            this.boulderRadius = value * 8;
            this.boulderValue = value;
            this.boulderDamage = 0;
            this.velocityX = 60 / value;
            this.velocityY = 0;
            this.next = null;

        };

        this.add = function(x, value, y = 20) {
            var node = new Node(x, value, y);
            if (head === null) {
                head = node;
                last = head;
            } else {
                var currentNode = last;
                last.next = node;
                last = node;
            }

            length++;

        };
        this.decreaseLength = function() {
            length--;
        };


        this.last = function() {
            return last;
        };

        this.head = function() {
            return head;
        };

        this.changeHead = function(newHead) {
            head = newHead.next;
        };
        this.headNull = function() {
            head = null;
        };

        this.checkHead = function(check) {
            if (head === check)
                return true;
            else
                return false;
        };


        this.drawBoulder = function() {
            var currentNode = head;
            while (currentNode) {
                ctx.beginPath();
                ctx.arc(currentNode.boulderX, currentNode.boulderY, currentNode.boulderRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                if (currentNode.boulderValue > 19)
                    ctx.fillStyle = "#0095DD";
                else if (currentNode.boulderValue > 9)
                    ctx.fillStyle = "#42f445";
                else
                    ctx.fillStyle = "#ff0033";

                ctx.fill();
                ctx.font = '40px serif';
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.fillText(currentNode.boulderValue - currentNode.boulderDamage, currentNode.boulderX, currentNode.boulderY);
                currentNode = currentNode.next;
            }
        }
    };


    var shoot = new bullet();
    var rock = new boulder();


    function spawnRock() {
        var value = Math.floor(Math.random() * 20) + 5;
        var prob = Math.floor(Math.random() + 0.5);
        var x;
        if (prob == 0)
            x = value * 8;
        else
            x = width - value * 8;
        rock.add(x, value);

    };


    function controlRock() {
        var currentRock = rock.head();
        const impulse = 200;
        const gravity = 1;


        while (currentRock) {
            currentRock.boulderX += currentRock.velocityX;
            currentRock.boulderY -= currentRock.velocityY;


            if (currentRock.boulderY + currentRock.boulderRadius > height) {
                currentRock.boulderY = height - currentRock.boulderRadius;
                currentRock.velocityY = -currentRock.velocityY;
            }
            if (currentRock.boulderX + currentRock.boulderRadius > width || currentRock.boulderX - currentRock.boulderRadius < 0) {
                currentRock.velocityX = -currentRock.velocityX;
            }
            currentRock.velocityY--;

            currentRock = currentRock.next;
        }

    };

    function rockDestroy(currentRock) {
        var child1;
        var child2;
        var x = currentRock.boulderX;
        var y = currentRock.boulderY;
        var velY = currentRock.velocityY
        var value = currentRock.boulderValue;
        if (value > 19) {
            rock.add(x, 10, y);
            child1 = rock.last();
            child1.velocityY = velY;
            rock.add(x, 10, y);
            child2 = rock.last();
            child2.velocityY = velY;
            child2.velocityX = -child2.velocityX;
        } else if (value > 9) {
            rock.add(x, 5, y);
            child1 = rock.last();
            child1.velocityY = velY;
            rock.add(x, 5, y);
            child2 = rock.last();
            child2.velocityY = velY;
            child2.velocityX = -child2.velocityX;
        }

    }

    function gunHitbox() {
        var currentRock = rock.head();
        while (currentRock) {
            if (currentRock.boulderY + currentRock.boulderRadius > height - 50)
                if ((currentRock.boulderX + 40 > Gun.gunX + 25) && (currentRock.boulderX - 40 < Gun.gunX + 75)) {
                    console.log("game Over");
                    var highScore = localStorage.getItem("highScore");
                    if (!localStorage.getItem('highScore')) {
                        localStorage.setItem('highScore', score);
                    } else {
                        if (highScore < score)
                            localStorage.setItem('highScore', score);
                    }
                    flag = false;
                    ctx.save();
                    console.log(flag);;
                }

            currentRock = currentRock.next;
        }
    }

    function collisionDetection() {
        var currentRock = rock.head();
        var oldRock;
        var oldBullet;
        while (currentRock) {
            var currentBullet = shoot.head();
            while (currentBullet) {
                if (currentBullet.bulletX > currentRock.boulderX - currentRock.boulderRadius && currentBullet.bulletX < currentRock.boulderX + currentRock.boulderRadius) {
                    if (currentBullet.bulletY < currentRock.boulderY + currentRock.boulderRadius && currentBullet.bulletY > currentRock.boulderY - currentRock.boulderRadius) {
                        if (shoot.checkHead(currentBullet)) {
                            shoot.changeHead(currentBullet);
                            shoot.decreaseLength();

                        } else {
                            oldBullet.next = currentBullet.next;
                            shoot.decreaseLength();

                        }

                        currentRock.boulderDamage++;
                        if (currentRock.boulderDamage == currentRock.boulderValue) {
                            score++;
                            if (rock.checkHead(currentRock)) {

                                rockDestroy(currentRock);
                                rock.changeHead(currentRock);
                                rock.decreaseLength();
                            } else {
                                rockDestroy(currentRock);
                                oldRock.next = currentRock.next;
                                rock.decreaseLength();
                            }
                        }
                    }
                }
                oldBullet = currentBullet;
                currentBullet = currentBullet.next;
            }
            oldRock = currentRock;
            currentRock = currentRock.next;
        }

    };


    function draw() {
        if (flag === true) {
            ctx.clearRect(0, 0, width, height);
            if (score > 30)
                frate = 2;
            else if (score > 20)
                frate = 3;
            else if (score > 10)
                frate = 5;
            else if (score > 5)
                frate = 6;
            else
                frate = 7;
            if (counter % frate == 0) {
                shoot.add();
            }
            counter = counter % frate;
            counter++;
            shoot.drawBullet();
            Gun.drawGun();
            rock.drawBoulder();
            controlRock();
            shoot.moveY();
            shoot.overflow();
            collisionDetection();
            if (rightPressed && Gun.gunX < (width - Gun.gunWidth)) {
                Gun.gunX += 10;
            } else if (leftPressed && Gun.gunX > 0) {
                Gun.gunX -= 10;
            }
            gunHitbox();
        } else {
            if (!localStorage.getItem('highScore')) {} else {
                var highScore = localStorage.getItem('highScore');
            }
            ctx.restore();
            ctx.font = '90px serif';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", width / 2, 400);
            ctx.font = '40px serif';
            ctx.fillText("Your Score:" + score, width / 2, 320);
            ctx.fillText("High Score:" + highScore, width / 2, 460);


            setTimeout(function() { document.location.reload(); }, 2000);

        }
        requestAnimationFrame(draw);
    }

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    setInterval(spawnRock, 5000);
    draw();

};
