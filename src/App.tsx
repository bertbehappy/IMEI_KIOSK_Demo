/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Kiosk from './components/Kiosk';

export default function App() {
  return (
    <div className="w-full h-[100dvh] flex flex-col bg-[#FFF8E7] font-sans overflow-hidden print:block print:h-auto print:min-h-0 print:bg-white print:overflow-visible">
      <div className="flex-1 flex justify-center items-center min-h-0 w-full h-full print:block print:h-auto print:min-h-0">
         <Kiosk />
      </div>
    </div>
  );
}
