import React, { useState } from "react";
import styles from "./RewardDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import { GiChest } from "react-icons/gi";
import coinImage from "../../assets/images/coin1.png";
import bolt from "../../assets/images/bolt-blue.png";
import hints from "../../assets/images/hint.png";

const RewardDialogBox = ({ onClose, reward, chestImage }) => {
  const [flipCoins, setFlipCoins] = useState(false);
  const [flipXp, setFlipXp] = useState(false);
  const [flipHints, setFlipHints] = useState(false);

  return (
    <BaseDialogBox>
      <div className={styles.layout}>
        <div className={styles.closeButton}>
          <CandyButton
            color="white"
            colorLight="#e0811b"
            colorDark="#e0811b"
            onClick={onClose}
          >
            <ImCross style={{ margin: "0.5rem" }} />
          </CandyButton>
        </div>
        <div className={styles.chestContainer}>
          <img
            className={styles.rewardChestImage}
            src={chestImage}
            alt="chest"
          />
        </div>
        <div className={styles.cardsContainer}>
          {reward.coins > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipCoins(true)}
            >
              <div
                className={styles.flipCard + (flipCoins && ` ${styles.flip}`)}
              >
                <div className={styles.flipCardFront}>
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img
                      className={styles.cardImage}
                      src={coinImage}
                      alt="coin"
                    />
                  </div>
                  {reward.coins}
                </div>
              </div>
            </div>
          )}
          {reward.xp > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipXp(true)}
            >
              <div className={styles.flipCard + (flipXp && ` ${styles.flip}`)}>
                <div className={styles.flipCardFront}>
                  {" "}
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img className={styles.cardImage} src={bolt} alt="xp" />
                  </div>
                  {reward.xp}
                </div>
              </div>
            </div>
          )}
          {reward.hints > 0 && (
            <div
              className={styles.flipCardContainer}
              onClick={() => setFlipHints(true)}
            >
              <div
                className={styles.flipCard + (flipHints && ` ${styles.flip}`)}
              >
                <div className={styles.flipCardFront}>
                  {" "}
                  <GiChest className={styles.cardIcon} />
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardImageContainer}>
                    <img className={styles.cardImage} src={hints} alt="hints" />
                  </div>
                  {reward.hints}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseDialogBox>
  );
};

export default RewardDialogBox;
