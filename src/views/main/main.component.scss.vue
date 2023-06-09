<style lang="scss">
  @import '~@/assets/styles/page';

  @font-face {
    font-family: 'AaKaiMingTi';
    src: url('../../assets/font/AaKaiMingTi-2.ttf');
    /*url('../../assets/font/AaKaiMingTi-2.ttf') format('truetype'),*/
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'YouSheBiaoTiHei';
    src: url('../../assets/font/YouSheBiaoTiHei-2.ttf');
    /*url('../../assets/font/AaKaiMingTi-2.ttf') format('truetype'),*/
    font-weight: normal;
    font-style: normal;
  }

  .first-wapper {
    width: 100%;
    overflow-y: auto;

    * {
      box-sizing: border-box;
    }
    font-family: Microsoft YaHei;

    .main-conten {
      overflow-y: auto;
      .mid-conten {
        height: 720px;
        margin: 10px 360px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        .box {
          background-color: #8c939d;
          width: 48%;
          height: 48%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .menu-fixed {
      position: fixed;
      top: 70px;
    }
    .top-bg {
      width: 100%;
      height: 620px;
      position: relative;
      background-image: url("../../assets/images/main/bg.jpg");
      background-repeat: no-repeat;
      background-size: 100% 675px;
      z-index: 99;
      .user-wapper {
        width: 100%;
        height: 70px;
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        background: #d9e2ef;
        /*background: rgba(66, 132, 215, 0.2);*/
        padding: 0 360px;
        .sys-title {
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 800;
          color: #046AE9;
          line-height: 70px;
          background: linear-gradient(0deg, #2C64B7 0.4150390625%, #046AE9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .user-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          .el-icon-user {
            color: rgba(4, 106, 233, 1);
            font-weight: bold;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
          }
          .el-icon-switch-button {
            color: rgba(255, 0, 0, 1);
            font-weight: bold;
            font-size: 18px;
            margin-left: 10px;
            cursor: pointer;
          }
          .el-icon-warning-outline {
            font-weight: bold;
            font-size: 18px;
            color: #333;
            margin-right: 10px;
            cursor: pointer;
          }
          .help-icon {
            width: 17px;
            height: 17px;
            display: inline-block;
            background-image: url("../../assets/images/main/help.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 5px 0 15px;
            cursor: pointer;
          }
        }
        .el-icon-switch-button {
          cursor: pointer;
        }
      }
      .user-title {
        height: 405px;
        display: flex;
        justify-content: center;
        align-items: center;
        .head-title {
          width: 1200px;
          height: 168px;
          margin-bottom: -195px;
          margin-left: 2px;
        }
      }
    }
    .menu-bg {
      width: 100%;
      height: 230px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 360px;
      /*margin-bottom: 45px;*/
      background-image: url("../../assets/images/main/menu.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 99;
      .menu-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .menu-icon {
          width: 98px;
          height: 98px;
          /*background: blue;*/
          border-radius: 10px;
          /*margin-bottom: 15px;*/
        }
        .menu-txt {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #333333;
        }
      }
      .menu-sy {
        background-image: url("../../assets/images/main/sy.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .menu-hhglpt {
        background-image: url("../../assets/images/main/hhglpt.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .menu-dsjksh {
        background-image: url("../../assets/images/main/dsjksh.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .menu-skxxypt {
        background-image: url("../../assets/images/main/skxxypt.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .menu-sgpt {
        background-image: url("../../assets/images/main/sgpt.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .menu-yyzcpt {
        background-image: url("../../assets/images/main/yyzcpt.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .bottom-bar {
      width: 100%;
      height: 100px;
      background: #0E5DBF;
    }
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .menu-bg2 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .menu-icon {
        width: 98px;
        height: 98px;
        border-radius: 10px;
      }
      .menu-txt {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
    }
    .menu-sy {
      background-image: url("../../assets/images/main/sy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .menu-hhglpt {
      background-image: url("../../assets/images/main/hhglpt.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .menu-dsjksh {
      background-image: url("../../assets/images/main/dsjksh.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .menu-skxxypt {
      background-image: url("../../assets/images/main/skxxypt.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .menu-sgpt {
      background-image: url("../../assets/images/main/sgpt.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .menu-yyzcpt {
      background-image: url("../../assets/images/main/yyzcpt.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
