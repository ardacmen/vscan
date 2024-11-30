import { useState } from "react";
import Purchases from "react-native-purchases";
import { checkHasActiveEntitlements } from "../services/iap";

const useIAP = (isPremium, setIsPremium) => {
  const [isLoading, setIsLoading] = useState(true);

  const subscribe = async (productId, onSuccess, onError) => {
    try {
      const { customerInfo } = await Purchases.purchaseProduct(productId);
      if (checkHasActiveEntitlements(customerInfo.entitlements)) {
        setIsPremium(true);
        onSuccess();
      } else {
        alert("Error occured, please try again later");
        onError();
      }
    } catch (e) {
      if (!e?.userCancelled) {
        alert("Error occured, please try again later");
      }
      onError(e);
    }
  };

  const restorePurchase = async () => {
    if (!isPremium) {
      setIsLoading(true);
      try {
        const restore = await Purchases.restorePurchases();
        if (checkHasActiveEntitlements(restore.entitlements)) {
          setIsPremium(true);
          alert("Subscription restored successfully");
        } else {
          alert("No active subscription found");
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    } else {
      alert("You already have a PRO subscription");
    }
  };

  return {
    isLoading,
    subscribe,
    restorePurchase,
  };
};

export default useIAP;
