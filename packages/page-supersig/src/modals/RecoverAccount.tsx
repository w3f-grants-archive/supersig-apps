// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  address: string;
  className?: string;
  onClose: () => void;
}

function RecoverAccount ({ address, className = '', onClose }: Props): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();
  const [recover, setRecover] = useState<string | null>(null);

  return (
    <Modal
      className={className}
      header={t<string>('Initiate account recovery')}
      onClose={onClose}
    >
      <Modal.Content>
        <InputAddress
          isDisabled
          label={t<string>('the account to recover to')}
          value={address}
        />
        <InputAddress
          help={t<string>('Select the account you wish to recover into this account.')}
          label={t<string>('recover this account')}
          onChange={setRecover}
          type='allPlus'
        />
      </Modal.Content>
      <Modal.Actions>
        <TxButton
          accountId={address}
          icon='recycle'
          isDisabled={!recover || recover === address}
          label={t<string>('Start recovery')}
          onStart={onClose}
          params={[recover]}
          tx={api.tx.recovery.initiateRecovery}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(RecoverAccount);
