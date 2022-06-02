const playList = document.querySelector(".playlist");
const playBtn = document.querySelector(".play--ui");
const playIco = document.querySelector(".play--ico")
const cd = document.querySelector(".cd--thumb");
const heading = document.querySelector(".header h2");
const audio = document.querySelector("#audio");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const processBar = document.querySelector(".process")
const musicApp = document.querySelector(".music--app")
const returnBtn = document.querySelector(".return")
const randomBtn = document.querySelector(".random")

const app = {
    currentIndex: 0,
    isReturn: false,
    isRandom: false,
    isPlaying: false,
    songs: [
        {
            name: "Anh đánh rơi người yêu này",
            author: "AMEE & Andiliez",
            path: "./assets/music/AnhDanhRoiNguoiYeuNay-Amee_Andiez.mp3",
            image: "./assets/img/AnhDanhRoiNguoiYeuNay.png"
        },
        {
            name: "Có chắc yêu là đây",
            author: "Sơn Tùng MTP",
            path: "./assets/music/CoChacYeuLaDay-MTP.mp3",
            image: "./assets/img/CoChacYeuLaDay.jpg"
        },
        {
            name: "Cứ thở đi",
            author: "Đức Phúc & JukySan",
            path: "./assets/music/CuThoDi-DucPhuc_JukySan.mp3",
            image: "./assets/img/CuThoDi.jpg"
        },
        {
            name: "Floating With You",
            author: "Venxento",
            path: "./assets/music/FloatingWithYou-Venxento.mp3",
            image: "./assets/img/FloatingWithYou.jpg"
        },
        {
            name: "Lung Lay",
            author: "Cucak",
            path: "./assets/music/LungLay-CuCak.mp3",
            image: "./assets/img/LungLay.jpg"
        },
        {
            name: "Mê",
            author: "Hoàng Duyên",
            path: "./assets/music/Me-HoangDuyen.mp3",
            image: "./assets/img/Me.jpg"
        },
        {
            name: "Never Letting Go",
            author: "Venxento",
            path: "./assets/music/NeverLettingGo-Venxento.mp3",
            image: "./assets/img/NeverLettingGo.jpg"
        },
        {
            name: "Northern Lights",
            author: "Venxento",
            path: "./assets/music/NorthernLights-Venxento.mp3",
            image: "./assets/img/Venxento.jpg"
        },
        {
            name: "Ngày Đầu Tiên",
            author: "Đức Phúc",
            path: "./assets/music/NgayDauTien-DucPhuc.mp3",
            image: "./assets/img/NgayDauTien.jpg"
        },
        {
            name: "Yêu rồi sẽ biết",
            author: "Cucak",
            path: "./assets/music/YeuRoiSeBiet-CuCak.mp3",
            image: "./assets/img/YeuRoiSeBiet.jpg"
        },
        {
            name: "Sau tất cả",
            author: "Erik",
            path: "./assets/music/SauTatCa-Erik.mp3",
            image: "./assets/img/SauTatCa.jpg"
        }
    ],
    handleEvent: function () {

        const _this = this;
        const cdThumbAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi song được play
        // When the song is played
        audio.onplay = function () {
            _this.isPlaying = true;
            musicApp.classList.add("playing");
            cdThumbAnimate.play();
            _this.scrollToActiveSong()
        };

        // Khi song bị pause
        // When the song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            musicApp.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomMusic();
            } else _this.nextSong()
            _this.render()
            audio.play();
        }
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomMusic();
            } else _this.prevSong()
            _this.render()
            audio.play();

        }
        audio.ontimeupdate = function () {
            if (audio.duration) {
                var processPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                processBar.value = processPercent
            }
        }
        // returnBtn.onclick= function(){
        //     this.classlist.toggle("btnActive")
        // }
        audio.onended = function () {
            if (_this.isReturn) {
                audio.play();
            } else {
                if (_this.isRandom) {
                    _this.randomMusic();
                } else {
                    _this.nextSong()
                    _this.render()
                    audio.play()
                }
            }
        }
        returnBtn.onclick = function () {
            if (!this.classList.contains("btnActive")) {
                this.classList.add("btnActive")
                _this.isReturn = true;

            } else {
                this.classList.remove("btnActive");
                _this.isReturn = false;
            }
        }

        randomBtn.onclick = function () {
            if (!this.classList.contains("btnActive")) {
                this.classList.add("btnActive")
                _this.isRandom = true;
            } else {
                this.classList.remove("btnActive");
                _this.isRandom = false;
            }
        }
        playList.onclick = function (e) {
            const songNode = e.target.closest(".playlist--song:not(.active)");
            const ellipsis = e.target.closest(".ellipsis--song");
            if (songNode && !ellipsis) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
            if (ellipsis) {
                var setting = ellipsis.querySelector(".setting");
                if (!setting.classList.contains("setting--active")) {
                    setting.classList.add("setting--active");
                } else {
                    setting.classList.remove("setting--active");


                }
            }
        }

        processBar.onClick = function () {
            console.log("a")
        }
        processBar.addEventListener("change", function () {
            audio.currentTime = Math.floor(this.value / 100 * audio.duration);
        })
        processBar.addEventListener("input", function () {
            audio.currentTime = Math.floor(this.value / 100 * audio.duration);
        })
    },
    randomMusic: function () {
        this.currentIndex = Math.floor(Math.random() * this.songs.length)
        this.loadCurrentSong();
        this.render();
        audio.play()
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            document.querySelector(".playlist--song.active").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 300);
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    loadCurrentSong: function () {
        heading.innerHTML = this.currentSong.name;
        cd.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    render: function () {

        var listSongs = this.songs.map(function (song, index) {
            return `
            <div class="playlist--song ${index === app.currentIndex ? "active" : ""}" data-index="${index}">
                    <div class="title--song">
                        <div class="title--song__img" style="background-image:url('${song.image}');">
                        </div>
                        <div class="title--song__infor">
                            <div class="title--song__name">
                                ${song.name}
                            </div>
                            <div class="title--song__author">
                                ${song.author}
                            </div>
                        </div>
                    </div>
                    <div class="ellipsis--song setting--${index}">
                        <div class="setting " data-index="${index}">
                            <div class="modifier">Delete <i class="fa-solid fa-trash"></i></div>
                        </div>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                    
            
                </div>
        `
        })
        playList.innerHTML = listSongs.join('')
    },
    start: function () {
        // hàm bắt sự kiên trong DOM
        this.handleEvent()
        this.defineProperties()
        // Render ra bài nhạc
        this.loadCurrentSong()
        this.render()
    }
}
app.start()