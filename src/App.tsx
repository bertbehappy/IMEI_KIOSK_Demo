/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Kiosk from './components/Kiosk';

export default function App() {
  return (
    <div className="w-full h-[100dvh] flex flex-col bg-[#F5F5F5] font-sans overflow-y-auto">
      <div className="flex-1 flex justify-center bg-[#E0E0E0] items-center sm:p-4 min-h-0">
         <Kiosk />
      </div>
    </div>
  );
}
