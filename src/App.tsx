/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Kiosk from './components/Kiosk';

export default function App() {
  return (
    <div className="w-full h-[100dvh] flex flex-col bg-[#E0E0E0] font-sans overflow-hidden">
      <div className="flex-1 flex justify-center items-center landscape:sm:p-4 min-h-0 w-full h-full">
         <Kiosk />
      </div>
    </div>
  );
}
