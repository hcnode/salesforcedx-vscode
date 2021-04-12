/*
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {
  Command,
  SfdxCommandBuilder
} from '@salesforce/salesforcedx-utils-vscode/out/src/cli';
import { nls } from '../messages';
import {
  EmptyParametersGatherer,
  FlagParameter,
  SfdxCommandlet,
  SfdxCommandletExecutor,
  SfdxWorkspaceChecker
} from './util';
import { sfdxCoreSettings } from '../settings';

export class ForceSourcePullExecutor extends SfdxCommandletExecutor<{}> {
  private flag: string | undefined;

  public constructor(flag?: string) {
    super();
    this.flag = flag;
  }

  public build(data: {}): Command {
    const builder = new SfdxCommandBuilder()
      .withDescription(
        nls.localize('force_source_pull_default_scratch_org_text')
      )
      .withArg('force:source:pull')
      .withLogName('force_source_pull_default_scratch_org');

    if (
      sfdxCoreSettings.getForcePushAndPullEnabled() ||
      this.flag === '--forceoverwrite'
    ) {
      builder
        .withArg('--forceoverwrite')
        .withDescription(
          nls.localize('force_source_pull_force_default_scratch_org_text')
        );
    }
    return builder.build();
  }
}

const workspaceChecker = new SfdxWorkspaceChecker();
const parameterGatherer = new EmptyParametersGatherer();

export async function forceSourcePull(this: FlagParameter<string>) {
  // tslint:disable-next-line:no-invalid-this
  const flag = this ? this.flag : undefined;
  const executor = new ForceSourcePullExecutor(flag);
  const commandlet = new SfdxCommandlet(
    workspaceChecker,
    parameterGatherer,
    executor
  );
  await commandlet.run();
}
