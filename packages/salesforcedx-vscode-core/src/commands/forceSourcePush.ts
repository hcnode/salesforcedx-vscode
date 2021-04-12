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
import { from } from 'rxjs/observable/from';
import { nls } from '../messages';
import { BaseDeployExecutor, DeployType } from './baseDeployCommand';
import {
  EmptyParametersGatherer,
  SfdxCommandlet,
  SfdxWorkspaceChecker
} from './util';
import { sfdxCoreSettings } from '../settings';

export class ForceSourcePushExecutor extends BaseDeployExecutor {
  private flag: string | undefined;

  public constructor(flag?: string) {
    super();
    this.flag = flag;
  }

  public build(data: {}): Command {
    const builder = new SfdxCommandBuilder()
      .withDescription(
        nls.localize('force_source_push_default_scratch_org_text')
      )
      .withArg('force:source:push')
      .withJson()
      .withLogName('force_source_push_default_scratch_org');
    if (
      sfdxCoreSettings.getForcePushEnabled() ||
      this.flag === '--forceoverwrite'
    ) {
      builder.withArg('--forceoverwrite');
      builder.withDescription(
        nls.localize('force_source_push_force_default_scratch_org_text')
      );
    }
    return builder.build();
  }

  protected getDeployType() {
    return DeployType.Push;
  }
}

const workspaceChecker = new SfdxWorkspaceChecker();
const parameterGatherer = new EmptyParametersGatherer();

export interface FlagParameter {
  flag: string;
}

export async function forceSourcePush(this: FlagParameter) {
  // tslint:disable-next-line:no-invalid-this
  const flag = this ? this.flag : undefined;
  const executor = new ForceSourcePushExecutor(flag);
  const commandlet = new SfdxCommandlet(
    workspaceChecker,
    parameterGatherer,
    executor
  );
  await commandlet.run();
}
