using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Bible.Realm.RNBibleRealm
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNBibleRealmModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNBibleRealmModule"/>.
        /// </summary>
        internal RNBibleRealmModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNBibleRealm";
            }
        }
    }
}
