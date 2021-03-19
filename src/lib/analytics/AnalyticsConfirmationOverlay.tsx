import React, { FC } from "react";

import classNames from "clsx";

import { Button } from "app/atoms/Button";
import { useAppEnv } from "app/env";
import ContentContainer from "app/layouts/ContentContainer";

import { useTempleClient } from "../temple/front";
import { useAnalyticsSettings } from "./use-analytics-settings.hook";

export const AnalyticsConfirmationOverlay: FC = () => {
  const { popup } = useAppEnv();
  const { ready } = useTempleClient();
  const { analyticsEnabled, setAnalyticsEnabled } = useAnalyticsSettings();

  const analyticsSettingsNotDefined = analyticsEnabled === undefined;

  const handleConfirmButtonClick = () => setAnalyticsEnabled(true);
  const handleCancelButtonClick = () => setAnalyticsEnabled(false);

  return ready && analyticsSettingsNotDefined ? (
      <>
        <div className={'fixed left-0 right-0 top-0 bottom-0 opacity-20 bg-gray-700 z-50'}>
        </div>
        <ContentContainer
          className={classNames(
            'fixed z-50',
            popup ? 'inset-0' : 'top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'
          )}
          padding={!popup}>
          <div className={classNames(
            'bg-white rounded-md shadow-lg py-8 px-15',
            popup && 'h-full'
          )}>
            <p className={'text-lg mb-4'}>Help us make the Temple Wallet better</p>
            <p className={'text-sm text-gray-700 mb-10'}>We are improving the Temple wallet constantly and we need your
              help. To
              better understand which section of the wallet should be updated, we gather anonymous usage data. This data
              will be used only for improving the usability of the Temple wallet.</p>
            <p className={'text-sm text-green-700 font-medium mb-2'}>What we collect:</p>
            <p className={'text-xs text-gray-700 mb-4'}>Anonymized click & pageview events</p>
            <p className={'text-sm text-red-700 font-medium mb-2'}>We NEVER track:</p>
            <p className={'text-xs text-gray-700 mb-2'}>Your keys, addresses, transactions, balances, hashes, IP, or any
              personal
              information.</p>
            <p className={'text-xs text-gray-600 mb-10'}>You may always turn off the
              analytics tracking feature in your wallet settings.</p>

            <div className={'flex '}>
              <Button
                className={classNames(
                  "py-2 px-4 rounded",
                  "border-2",
                  "border-blue-500 hover:border-blue-600 focus:border-blue-600",
                  "flex items-center justify-center",
                  "text-white",
                  "shadow-sm hover:shadow focus:shadow",
                  "text-base font-semibold",
                  "transition ease-in-out duration-300",
                  "bg-blue-500",
                  "w-35 mr-7"
                )}
                onClick={handleConfirmButtonClick}
              >
                Cofirm
              </Button>
              <Button
                className={classNames(
                  "py-2 px-4 rounded",
                  "border-2",
                  "border-blue-500 hover:border-blue-600 focus:border-blue-600",
                  "flex items-center justify-center",
                  "text-blue-500 hover:text-blue-600 focus:text-blue-600",
                  "shadow-sm hover:shadow focus:shadow",
                  "text-base font-semibold",
                  "transition ease-in-out duration-300",
                  "w-35"
                )}
                onClick={handleCancelButtonClick}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ContentContainer>
      </>
    ) :
    null;
}