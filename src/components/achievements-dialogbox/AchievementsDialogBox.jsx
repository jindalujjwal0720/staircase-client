import React, { useEffect, useState } from "react";
import styles from "./AchievementsDialogBox.module.css";
import BaseDialogBox from "../dialogbox/base-dialogbox/BaseDialogBox";
import CandyButton from "../buttons/candybutton/CandyButton";
import { ImCross } from "react-icons/im";
import chest from "../../assets/images/chest.png";
import chest1 from "../../assets/images/chest1.png";
import chest2 from "../../assets/images/chest2.png";
import chest3 from "../../assets/images/chest3.png";
import chest4 from "../../assets/images/chest4.png";
import chest5 from "../../assets/images/chest5.png";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";
import { LoadingIcon } from "../loading/Loading";
import RewardDialogBox from "../reward-dialogbox/RewardDialogBox";

const AchievementsDialogBox = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser, updateCurrentUser } = useAuth();
  const [achievements, setAchievements] = useState(null);
  const { getAchievements, openReward } = useGame();
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState(null);

  const getImage = (chestImageName) => {
    if (chestImageName === "chest1") return chest1;
    else if (chestImageName === "chest2") return chest2;
    else if (chestImageName === "chest3") return chest3;
    else if (chestImageName === "chest4") return chest4;
    else if (chestImageName === "chest5") return chest5;
    return chest;
  };

  const fetchAchievements = async () => {
    setLoading(true);
    let data = await getAchievements();
    for (let i = 0; i < data.achievements.length; i++) {
      data.achievements[i] = {
        ...getAchievementProps(data.achievements[i]),
      };
    }
    setAchievements(data.achievements);
    setLoading(false);
  };

  const getAchievementProps = (achievement) => {
    let progress = "";
    let percentageComplete = 0;
    let condition = achievement.condition;
    let isCompleted = false;
    if (achievement.type === "games-played") {
      if (currentUser.gamesPlayed >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.gamesPlayed}/${condition}`;
        percentageComplete = (currentUser.gamesPlayed / condition) * 100;
      }
    } else if (achievement.type === "purchases-from-coins") {
      if (currentUser.purchasesCoinsAmount >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.purchasesCoinsAmount}/${condition}`;
        percentageComplete =
          (currentUser.purchasesCoinsAmount / condition) * 100;
      }
    } else if (achievement.type === "hints-used") {
      if (currentUser.totalHintsUsed >= condition) {
        isCompleted = true;
        progress = `${condition}/${condition}}`;
        percentageComplete = 100;
      } else {
        progress = `${currentUser.totalHintsUsed}/${condition}`;
        percentageComplete = (currentUser.totalHintsUsed / condition) * 100;
      }
    }
    return {
      name: achievement.name,
      description: achievement.description,
      chestImage: getImage(achievement.rewards.chestImage),
      progress: progress,
      isCompleted: isCompleted,
      percentageComplete: percentageComplete,
    };
  };

  const openRewardHandler = (reward) => {
    setReward(reward);
    setShowReward(true);
    openReward(reward.id).then(() => {
      updateCurrentUser();
    });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <BaseDialogBox>
      {showReward && (
        <RewardDialogBox
          onClose={() => setShowReward(false)}
          reward={reward.rewards}
          chestImage={getImage(reward.chestImage)}
        />
      )}
      <div className={styles.pseudoHeader}>
        <div className={styles.header}>
          <div className={styles.headerText}>Achievements</div>
        </div>
      </div>
      <div className={styles.rewardsScrollingContainer}>
        {currentUser.rewards.length > 0 ? (
          currentUser.rewards.map((reward, index) => {
            return (
              <div
                className={styles.rewardSquare}
                onClick={() => openRewardHandler(reward)}
                key={index}
              >
                <img
                  className={styles.rewardImage}
                  src={getImage(reward.chestImage)}
                  alt="rewards"
                />
              </div>
            );
          })
        ) : (
          <div className={styles.noRewardsText}>You have no rewards left!</div>
        )}
      </div>
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

        {loading ? (
          <LoadingIcon />
        ) : (
          achievements &&
          achievements.map((achievement, index) => {
            return (
              <div className={styles.tile} key={index}>
                <div className={styles.tileLeft}>
                  <div className={styles.tileTitle}>{achievement.name}</div>
                  <div className={styles.tileDescription}>
                    {achievement.description}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressBarInner}
                      style={{ width: `${achievement.percentageComplete}%` }}
                    >
                      <div className={styles.progressBarInnerLabel}>
                        {achievement.progress}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.tileRight}>
                  <div className={styles.rewardImageContainer}>
                    <img
                      className={
                        achievement.isCompleted
                          ? styles.rewardImage
                          : styles.rewardImageUsed
                      }
                      src={achievement.chestImage}
                      alt="rewards"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseDialogBox>
  );
};

export default AchievementsDialogBox;
