/**
 * @license
 * Copyright 2024 Neural Networks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Header from '@/components/header';
import { IssueMap } from '@/components/issue-map';

export default function MapPage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <Header pageTitle="Issue Map" />
      <main className="flex-1">
        <IssueMap />
      </main>
    </div>
  );
}
