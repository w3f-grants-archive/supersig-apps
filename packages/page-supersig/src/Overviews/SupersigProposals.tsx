// Copyright 2017-2022 @polkadot/app-supersig authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Loke Referendums

import type { DeriveReferendumExt } from '@polkadot/api-derive/types';

import React, { useRef } from 'react';

import { Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Referendum from './Referendum';
import SupersigProposal from './SupersigProposal';

interface Props {
  className?: string;
  referendums?: DeriveReferendumExt[];
}

function Referendums ({ className = '', referendums }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const headerRef = useRef([
    [t('supersig-proposals'), 'start', 2],
    [t('remaining'), 'media--1200'],
    [t('activate'), 'media--1400'],
    [t('turnout'), 'media--1400'],
    [undefined, 'badge'],
    [t('votes'), 'expand'],
    [t<string>('support'), 'media--1000'],
    [undefined, undefined, 2],
    [undefined, 'media--1000']
  ]);

  return (
    <Table
      className={className}
      empty={referendums && t<string>('No active supersig proposals in this blockchain currently')}
      header={headerRef.current}
    >
      {referendums?.map((referendum): React.ReactNode => (
        <Referendum
          key={referendum.index.toString()}
          value={referendum}
        />
      ))}
    </Table>
  );
}

export default React.memo(Referendums);
