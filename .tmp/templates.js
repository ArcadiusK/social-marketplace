angular.module('cornerfindApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/about/about.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"col-md-12\">\n" +
    "\n" +
    "    <!-- Start Full Team Page -->\n" +
    "    <center>\n" +
    "    <section id=\"instructors\" class=\"page\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"row team\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div class=\"title\"><h1><center>The Team</center></h1></div>\n" +
    "                    <hr>\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                               <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424062000450photo_justin.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Justin Cohen</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/justincoh/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/justincoh\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                                    <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424062016133photo_mitsu.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Mitsuaki Uchimoto</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "                                 <li><a href=\"https://www.linkedin.com/in/mitsuakiu/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/muchimoto\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424061972553photo_david.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">David Chang</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/davidjchang/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/wawaontheloose\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                            <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424061553095photo_arcadius_400.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Arcadius Kazimierski</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/arcadiusk/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"http://github.com/ArcadiusK\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                 </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </section>\n" +
    "\n" +
    "  </center>\n" +
    "\n" +
    "    </div>\n"
  );


  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <h4 id='loginTitle'>Login</h4>\n" +
    "     \n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <form class=\"form\" name=\"form\" ng-submit=\"login(form)\" novalidate>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='email' type=\"email\" class=\"validate\" ng-model=\"user.email\" required/>\n" +
    "            <label for=\"email\" class='active'>Email</label>\n" +
    "          </div>      \n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "           <div class=\"input-field col s12\">\n" +
    "            <input name='password' type=\"password\" class=\"validate\" ng-model=\"user.password\" required/>\n" +
    "            <label for=\"password\" class='active'>Password</label>\n" +
    "          </div> \n" +
    "        </div>\n" +
    "\n" +
    "          \n" +
    "        <div class=\"form-group has-error\">\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">\n" +
    "             Please enter your email and password.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.email && submitted\">\n" +
    "             Please enter a valid email.\n" +
    "          </p>\n" +
    "\n" +
    "          <p class=\"help-block\">{{ errors.other }}</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "          <button class=\"btn btn-inverse btn-lg btn-login\" type=\"submit\">\n" +
    "            Login\n" +
    "          </button>\n" +
    "          <a class=\"btn btn-default btn-lg btn-register\" href=\"/signup\">\n" +
    "            Register\n" +
    "          </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <hr>\n" +
    "</div>\n"
  );


  $templateCache.put('app/account/manageAccount/changePassword.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <h1>Change Password</h1>\n" +
    "  </div>\n" +
    "  <div class=\"col s12\">\n" +
    "    <form class=\"form\" name=\"form\" ng-submit=\"changePassword(form)\" novalidate>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>Current Password</label>\n" +
    "\n" +
    "        <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"user.oldPassword\"\n" +
    "               mongoose-error/>\n" +
    "        <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n" +
    "            {{ errors.other }}\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>New Password</label>\n" +
    "\n" +
    "        <input type=\"password\" name=\"newPassword\" class=\"form-control\" ng-model=\"user.newPassword\"\n" +
    "               ng-minlength=\"3\"\n" +
    "               required/>\n" +
    "        <p class=\"help-block\"\n" +
    "           ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">\n" +
    "          Password must be at least 3 characters.\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"help-block\"> {{ message }} </p>\n" +
    "\n" +
    "      <button class=\"btn\" type=\"submit\">Save changes</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageAccount.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div resizable class='container'>\n" +
    "\n" +
    "\n" +
    "    <div class='row'>\n" +
    "\n" +
    "        <div class='col s12 m3 l3'>\n" +
    "            <a class='col s12' ui-sref-active='active' id='my-collection' ui-sref='account.profile'>Account Info</a>\n" +
    "             <a class='col s12' ui-sref-active='active' id='my-collection' ui-sref='account.address'>Manage Address</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.settings')}\" id='my-collection' ui-sref=\"account.settings\">Change Password</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.listings')}\" id='my-collection' ui-sref=\"account.listings\">View Listings</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.offers')}\" id='my-collection' ui-sref=\"account.offers\">View Orders</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.balance')}\" id='my-collection' ui-sref=\"account.balance\">View Balance</a>\n" +
    "        </div>\n" +
    "        <div class='col s1 m1 l1'></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class='col s12 m8 l8 offset-l1 offset-m1' ui-view>{{hello}} {{currentUser.name}}! Manage your account via the tabs on the left.</div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageAddress.html',
    "<h3>Billing Address</h3>\n" +
    "<easypost addyType='billing'></easypost>\n" +
    "<!-- \n" +
    "<h3>Shipping Address</h3>\n" +
    "<easypost saveAddy='shipping'></easypost>\n" +
    "\n" +
    " -->"
  );


  $templateCache.put('app/account/manageAccount/manageListing.card.html',
    "<div class=\"card\">\n" +
    "    <div class=\"card-image waves-effect waves-block waves-light\" style=\"width:100%\">\n" +
    "        <img class=\"activator\" src=\"{{listing.photoUrls[0]}}\">\n" +
    "    </div>\n" +
    "    <div class=\"card-content\">\n" +
    "        <span class=\"card-title activator grey-text text-darken-4\">{{listing.name}} <i class=\"mdi-navigation-more-vert right\"></i></span>\n" +
    "        <p><a href=\"#\">This is a link</a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- hidden stuff -->\n" +
    "    <div class=\"card-reveal\">\n" +
    "        <span class=\"card-title grey-text text-darken-4\">Edit {{listing.name}} <i class=\"mdi-navigation-close right\"></i></span>\n" +
    "        <success-confirmation ng-show='submitted' text='edited {{listing.name}}'></success-confirmation ng-show='success'>\n" +
    "        <div class='input-form' ng-show='!submitted'>\n" +
    "            <form ng-submit=\"editProduct({listing:listing})\">\n" +
    "                \n" +
    "                <input type='text' ng-model='listing.name'></input>\n" +
    "                <label>Description</label>\n" +
    "                <textarea ng-model='listing.desc'></textarea>\n" +
    "                \n" +
    "                <div class='col s6 m6 l6'>\n" +
    "\t                <label>Price</label>\n" +
    "\t                <input type=\"number\" ng-model=\"listing.price\"></input>\n" +
    "                </div>\n" +
    "                <div class='col s6 m6 l6'>\n" +
    "                \tPlaceholder\n" +
    "                </div>\n" +
    "                <button class='btn purple accent-3 waves-effect' ng-click='submitButton()'>Submit Changes</button>\n" +
    "                <button type='button' class='btn red accent-4'>Cancel</button>\n" +
    "                <!-- how can i make the cancel button wipe the changes that were made? -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageListings.html',
    "<div class=\"row\">\n" +
    "\n" +
    "  \t<h1>LISTINGS VIEW {{currentUser.name}}</h1>\n" +
    "  \t\n" +
    "  \t<div class='col s12 m12 l6' ng-repeat=\"listing in usersListings\">\n" +
    "  \t<!-- need to get offers on this product and display-->\n" +
    "  \t<manage-listing-card info='listing' edit-product=\"submitProductChanges(listing)\"></manage-listing-card>\n" +
    "\n" +
    "  \t</div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageOffer.card.html',
    "<div class=\"row\" id='manageOfferCard'>\n" +
    "    <div class=\"col s12 m11 l10 offset-l1 offset-m1\">\n" +
    "        <div class=\"card blue lighten-3\">\n" +
    "            <div class=\"card-content black-text\"><!-- remove inline styles -->\n" +
    "                <a ui-sref='user({name: offer.buyerId.username})' style=\"text-decoration:none; font-size: 1.5rem; \"><span class=\"card-title black-text buyerName\" >Buyer: {{offer.buyerId.name}} </span></a>\n" +
    "                <ul>\n" +
    "                    <p class='offerStatus'>Offer Status: {{offer.status}}</p>\n" +
    "                    <h5 class='offerTitle'>Items in this offer:</h5>\n" +
    "                    <li ng-repeat='product in offer.lineItems' class='offerItems'>\n" +
    "                        {{product.name}} - Listed Price: {{product.originalPrice | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <div class='total'>Offer Total: {{offer.orderTotal | currency}}</div>\n" +
    "            </div>\n" +
    "            <div class=\"card-action\">\n" +
    "                <form ng-hide=\"status.status.indexOf(offer.status) > -1 \" ng-submit=\"acceptOffer({offerId: offer._id, orderObj:offer})\">\n" +
    "                    <button ng-hide='accepted' class='btn' ng-click=\"submitButton()\">Accept Offer</button>\n" +
    "                    <!-- <button ng-hide='accepted' type='button' class='btn'>Reject button?</button> -->\n" +
    "                </form>\n" +
    "                <button ng-show= 'reviewable' class='btn' ng-click=\"review()\">Leave a Review!</button>\n" +
    "                <form ng-show='showReview' ng-submit=\"submitReview()\">\n" +
    "                    <div class=\"form-panel\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-7\">\n" +
    "                                <p>How was your experience with {{offer.buyerId.name}}?</p>\n" +
    "                                <input type=\"text\" ng-model=\"reviewText\" ng-required=\"true\">\n" +
    "                                <br/>\n" +
    "                                <p>How many stars?</p>\n" +
    "                                <span ng-repeat='star in starClasses track by $index'>\n" +
    "                            <span class=\"glyphicon glyphicon-star\" ng-class=\"star\" ng-click=\"setStars($index+1)\"></span>\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <button class='btn'>Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageOffers.html',
    "<div ng-hide=\"offers.length\">\n" +
    "    <h4>There are no pending offers on your listings</h4>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<manage-offer-view ng-hide='showModal' currentUser='currentUser' status='status' info=\"offer\" accept-offer=\"acceptOffer(offerId,orderObj)\" ng-repeat='offer in offers' stripe-result='stripeResult'></manage-offer-view>\n" +
    "\n" +
    "<div>\n" +
    "    <script type=\"text/ng-template\" id=\"templateId\">\n" +
    "        \t<h3 style=\"text-align: center; color: white;\">Your order is processing</h3>\n" +
    "        \t<p style=\"text-align: center; color: white;\">Please hold on a few seconds</p>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageProfile.html',
    "<div class=\"row\">\n" +
    "    <success-confirmation ng-show='success' text='edited profile!'></success-confirmation>\n" +
    "    <form ng-hide='success' class=\"col s12\" ng-submit=\"updateUser(currentUser)\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class='input-field col s4'>\n" +
    "                <img class='thumbnail' width = '100%' src='{{currentUser.picture}}'>\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-action-account-circle prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.name' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-communication-email prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.email' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-communication-phone prefix\"></i>\n" +
    "                <input id=\"icon_telephone\" type=\"tel\" ng-model='currentUser.phoneNumber' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-create prefix\"></i>\n" +
    "                <textarea id=\"icon_prefix\" type=\"text\" ng-model='currentUser.description' class=\"validate\" />\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-mail prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.billAddy' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-send prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.shipAddy' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class='col s6'>\n" +
    "                <button class='btn blue'>Submit Changes</button>\n" +
    "                <button type='button' class='btn red' ng-click='cancelChanges()'>Reset Form</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "       <h4 id='loginTitle'>Sign Up</h4>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <form class=\"form\" name=\"form\" ng-submit=\"register(form)\" novalidate>\n" +
    "\n" +
    "     \n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\">\n" +
    "          \n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='name' type=\"text\" class=\"validate\" ng-model=\"user.name\" required/>\n" +
    "            <label for='name' class='active'>Name</label>\n" +
    "          </div>\n" +
    "          <p class=\"help-block\" ng-show=\"form.name.$error.required && submitted\">\n" +
    "            A name is required\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "     <div class=\"form-group\" ng-class=\"{ 'has-success': form.username.$valid && submitted,\n" +
    "                                            'has-error': form.username.$invalid && submitted }\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='username' type=\"text\" class=\"validate\" ng-model=\"user.username\" required/>\n" +
    "            <label for=\"username\" class='active'>Username (lowercase and numbers only)</label>\n" +
    "          </div>\n" +
    "          <p class=\"help-block\" ng-show=\"form.username.$error.required && submitted\">\n" +
    "            A username is required - lowercase and numbers only, no spaces\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.username.$error.mongoose\">\n" +
    "            {{ errors.username }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\">\n" +
    "          \n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='email' type=\"email\" class=\"validate\" ng-model=\"user.email\" required mongoose-error/>\n" +
    "            <label for=\"email\" class='active'>Email</label>\n" +
    "          </div>                                   \n" +
    "\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.email && submitted\">\n" +
    "            Doesn't look like a valid email.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.required && submitted\">\n" +
    "            What's your email address?\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.mongoose\">\n" +
    "            {{ errors.email }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='password' type=\"password\" class=\"validate\" ng-model=\"user.password\" ng-minlength=\"3\"\n" +
    "                 required\n" +
    "                 mongoose-error>\n" +
    "            <label for=\"password\" class='active'>Password</label>\n" +
    "          </div>     \n" +
    "\n" +
    "          <p class=\"help-block\"\n" +
    "             ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">\n" +
    "            Password must be at least 3 characters.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n" +
    "            {{ errors.password }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "          <button class=\"btn btn-inverse btn-lg btn-login\" type=\"submit\">\n" +
    "            Sign up\n" +
    "          </button>\n" +
    "         <!--\n" +
    "         <a class=\"btn btn-default btn-lg btn-register\" href=\"/login\">\n" +
    "            Login\n" +
    "          </a>\n" +
    "          -->\n" +
    "        </div>\n" +
    "\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <hr>\n" +
    "</div>\n"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <p>The delete user and user index api routes are restricted to users with the 'admin' role.</p>\n" +
    "  <ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"user in users\">\n" +
    "        <strong>{{user.name}}</strong><br>\n" +
    "        <span class=\"text-muted\">{{user.email}}</span>\n" +
    "        <a ng-click=\"delete(user)\" class=\"trash\"><span class=\"glyphicon glyphicon-trash pull-right\"></span></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );


  $templateCache.put('app/chat/chat.html',
    "\n" +
    "<div class=\"row chat section\">\n" +
    "      <div class=\"col l12 s12\" ng-controller=\"ChatCtrl\">\n" +
    "          <div class=\"card-panel pink lighten-5\"  ng-repeat=\"chat in chatList\">\n" +
    "            <h3 id='chatUsername'>{{chat.username}}</h3>\n" +
    "            <h4 id=\"chatText\">{{chat.textLine}}</h4>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-controller=\"ChatCtrl\" ng-show=\"isLoggedIn()\">\n" +
    " <div class=\"card-panel blue lighten-4\">\n" +
    "  <form ng-submit=\"addChat(newChatText)\">\n" +
    "\n" +
    "    <div class=\"input-field\">\n" +
    "\n" +
    "      <i class=\"mdi-editor-mode-edit prefix\"></i>\n" +
    "      <textarea id=\"icon_prefix2\" class=\"materialize-textarea\" ng-model=\"newChatText\"></textarea>\n" +
    "      <label for=\"icon_prefix2\">New Message</label>\n" +
    "\n" +
    "      <button type=\"submit\" class=\"btn btn-primary center-align\">Submit</button>\n" +
    "\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--\n" +
    " <input type='text' id='nameInput' placeholder='Name' >\n" +
    "    <input type='text' id='messageInput' placeholder='Message'>\n" +
    "\n" +
    "    <script>\n" +
    "    var myDataRef = new Firebase('https://cornerfind.firebaseio.com/');\n" +
    "      $('#messageInput').keypress(function (e) {\n" +
    "        if (e.keyCode == 13) {\n" +
    "          var name = $('#nameInput').val();\n" +
    "          var text = $('#messageInput').val();\n" +
    "          console.log(\"name: \", name)\n" +
    "          myDataRef.set('User ' + name + ' says ' + text);\n" +
    "          $('#messageInput').val('');\n" +
    "        }\n" +
    "      });\n" +
    "\n" +
    "      myDataRef.on('child_added', function(snapshot) {\n" +
    "        var message = snapshot.val();\n" +
    "        displayChatMessage(message.name, message.text);\n" +
    "      });\n" +
    "\n" +
    " function displayChatMessage(name, text) {\n" +
    "        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));\n" +
    "        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;\n" +
    "      };\n" +
    "    </script>\n" +
    "\n" +
    "<div id=\"#messagesDiv\" >\n" +
    "</div>\n" +
    " -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col l12\">\n" +
    "      <h1 class=\"page-header\">Chat</h1>\n" +
    "      <ul class=\"nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6\" ng-repeat=\"chat in chatlist\">\n" +
    "        <li><a href=\"#\">{{chat.username}}</a></li>\n" +
    "        <li><a href=\"#\">{{chat.textLine}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div> -->\n" +
    "\n" +
    "\n" +
    " <!--  <form class=\"chat-form\">\n" +
    "      <label>Comment</label>\n" +
    "      <p class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Your Name:\" ng-model=\"newChat.name\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Comment here...\" ng-model=\"newChat.text\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"addchat({newChat:newChat})\">Add New</button>\n" +
    "        </span>\n" +
    "\n" +
    "      </p>\n" +
    "  </form>\n" +
    "\n" +
    "</div> -->\n"
  );


  $templateCache.put('app/checkout/checkoutDirective/checkoutDirective.html',
    "<form name=\"checkoutForm\" ng-submit=\"checkout()\">\n" +
    "\n" +
    "    <div class='form-group'>\n" +
    "        <h5>Before putting in an offer, you must provide payment details. All offers expire after 24 hours, and your card <em>will not</em> be charged unless the seller accepts your bid within the 24 hour period.</h5>\n" +
    "    </div>\n" +
    "    <div class=\"form-panel\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input type=\"text\" class=\"form-control credit\" ng-model=\"ccinfo.number\" payments-validate=\"card\" payments-format=\"card\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>CVC</label>\n" +
    "                <input type=\"text\" class=\"form-control cvc\" ng-model=\"ccinfo.cvc\" payments-validate=\"cvc\" payments-format=\"cvc\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>Expiration</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"ccinfo.expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" ng-required=\"true\" placeholder='mm/yy'>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group center-align\">\n" +
    "        <button type=\"submit\" class=\"waves-effect waves-light btn blue darken-2\" ng-disabled=\"checkoutForm.$invalid\">Submit</button>\n" +
    "        <button type=\"button\" class=\"btn red darken-2\"  ng-click='showtoken =!showtoken'>Cancel</button>\n" +
    "    </div>\n" +
    "</form>"
  );


  $templateCache.put('app/components/success.view.html',
    "<div class=\"col s12\">\n" +
    "\t<h3>Successfully {{text}}</h3>\n" +
    "</div>"
  );


  $templateCache.put('app/easypost/easypost.html',
    "<div class=\"easy-post\">\n" +
    "    <div class=\"row\" ng-controller='EasypostCtrl'>\n" +
    "        <div class='col s12'>\n" +
    "            <div ng-show='badAddress' class=\"error\">\n" +
    "                <h4>Error Verifying Address:</h4>{{errorMessage}} Please re-renter your information.</div>\n" +
    "        </div>\n" +
    "        <form class=\"col s12\" ng-submit='saveAddress(address)' ng-model='address'>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"first_name\" type=\"text\" class=\"validate\" ng-model='address.name'>\n" +
    "                    <label class='active' for=\"first_name\">Full Name</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"address1\" type=\"text\" class=\"validate\" ng-model='address.street1'>\n" +
    "                    <label class='active' for=\"address1\">Address Line 1 (Street address, P.O. box, company name, etc.)</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"address2\" type=\"text\" class=\"validate\" ng-model='address.street2'>\n" +
    "                    <label class='active' for=\"address2\">Address Line 2 (Apartment., suite, unit, floor, etc.)</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s7\">\n" +
    "                    <input id=\"city\" type=\"text\" class=\"validate\" ng-model='address.city'>\n" +
    "                    <label class='active' for=\"city\">City</label>\n" +
    "                </div>\n" +
    "                <div class=\"input-field col s2\">\n" +
    "                    <input id=\"password\" type=\"text\" class=\"validate\" ng-model='address.state'>\n" +
    "                    <label class='active' for=\"password\">State</label>\n" +
    "                </div>\n" +
    "                <div class=\"input-field col s3\">\n" +
    "                    <input id=\"zipcode\" type=\"text\" class=\"validate\" ng-model='address.zip'>\n" +
    "                    <label class='active' for=\"zipcode\">Zip</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"phone\" type=\"text\" class=\"validate\" ng-model='address.phone'>\n" +
    "                    <label class='active' for=\"phone\">Phone Number</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"email\" type=\"email\" class=\"validate\" ng-model='address.email'>\n" +
    "                    <label class='active' for=\"email\">Email</label>\n" +
    "                </div>\n" +
    "                <!-- <div class=\"input-field col s6\"> -->\n" +
    "                <button class=\"col s5 btn waves-effect waves-light red \" type=\"button\" name=\"action\" ng-class='buttonColor' ng-click='resetAddy()'>Clear Form\n" +
    "                </button>\n" +
    "                <!-- </div> -->\n" +
    "                <!-- <div class=\"input-field col s6\"> -->\n" +
    "                <button class=\" col s5 btn waves-effect waves-light right\" type=\"submit\" name=\"action\" ng-class='buttonColor'>Confirm\n" +
    "                </button>\n" +
    "                <!-- </div> -->\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/main/main.html',
    "\n" +
    "<div ng-include=\"'components/navbar/navbar.html'\" class=\"pink\"></div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"slider\">\n" +
    "    <ul class=\"slides\">\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424057659479dark_front_bench.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption center-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for all baby products</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424059325413dark_front_squares33.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption left-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for clothes, toys, books, cribs, strollers...</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424057894921dark_front_standing.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption right-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for all baby products</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      <div ng-show='loggedin' class=\"fixed-action-btn\" style=\"bottom: 45px; right: 24px;\">\n" +
    "          <a class=\"btn-floating btn-large arc-was-red\" ng-click=\"addProduct()\">\n" +
    "              <i class=\"large mdi-content-add\"></i>\n" +
    "          </a>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"input-field col l8 m9 s12\">\n" +
    "        <form class=\"form\" role=\"form\" ng-submit='searchSubmit(searchText)'>\n" +
    "            <i class=\"mdi-action-search prefix\"></i>\n" +
    "            <input type=\"text\" ng-model=\"searchText\" class=\"form-control btn-block\" id=\"searchbox\" ng-change=\"searchSubmit(searchText)\" ng-model-options=\"{debounce:500}\">\n" +
    "            <label for=\"icon_prefix\">Search</label>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "    <div ng-repeat=\"product in productList\">\n" +
    "        <div ng-switch='' on='$index % 3'>\n" +
    "            <div class=\"row\" ng-switch-when=\"0\">\n" +
    "                <product-card-view info=\"productList[$index+0]\" ng-show=\"productList[$index+0]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "\n" +
    "                <product-card-view info=\"productList[$index+1]\" ng-show=\"productList[$index+1]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "\n" +
    "                <product-card-view info=\"productList[$index+2]\" ng-show=\"productList[$index+2]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/offer/offer.directive.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col s12 m12 l12\">\n" +
    "\n" +
    "        <!-- Main Card Content -->\n" +
    "        <div class=\"card blue lighten-3\" ng-hide=\"isBeingModified\">\n" +
    "\n" +
    "            <div class=\"card-content black-text\">\n" +
    "                <span class=\"card-title black-text\">Seller: {{::offer.sellerId.name}}</span>\n" +
    "                <ul>\n" +
    "                    <h5>Items in this offer:</h5>\n" +
    "                    <li ng-repeat='product in offer.lineItems'>\n" +
    "                        {{product.name}} - Listed Price: {{::product.productId.price | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <hr>\n" +
    "                <div>Offer Total: {{offer.orderTotal | currency}}</div>\n" +
    "                <div>Offer Status: {{offer.status}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-hide='statusCheck.status.indexOf(offer.status) > -1' class=\"card-action\" id=\"offer-card-action\">\n" +
    "                <button class='col s6 btn' ng-click=\"isBeingModified=true\">Modify Offer</button>\n" +
    "                <button type='button' class=' col s6 btn red darken-2' ng-click=\"cancelOffer({offerId: offer})\">Cancel Offer</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <button ng-show=\"statusCheck.status.indexOf(offer.status) > -1 && !offer.reviewed &&!finished\" class='btn' ng-click=\"review()\">Leave a Review!</button>\n" +
    "            <form ng-show='showReview && !offer.reviewed && !finished' ng-submit=\"submitReview()\">\n" +
    "                <div class=\"form-panel\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-7\">\n" +
    "                            <p>How was your experience with {{offer.buyerId.name}}?</p>\n" +
    "                            <input type=\"text\" ng-model=\"reviewText\" ng-required=\"true\">\n" +
    "                            <br/>\n" +
    "                            <p>How many stars?</p>\n" +
    "                            <span ng-repeat='star in starClasses track by $index'>\n" +
    "                            <span class=\"glyphicon glyphicon-star\" ng-class=\"star\" ng-click=\"setStars($index+1)\"></span>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button type='submit' class='btn'>Submit</button>\n" +
    "            </form>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- End Main Cart Content -->\n" +
    "\n" +
    "        <!-- Modify Order Form -->\n" +
    "        <div class=\"card  blue lighten-3\" ng-show=\"isBeingModified\">\n" +
    "            <div class=\"card-content black-text\">\n" +
    "                <span class=\"card-title black-text\">Change Your Offer</span>\n" +
    "                <ul>\n" +
    "                    <h3>Items in this offer:</h3>\n" +
    "                    <li ng-repeat='product in offer.lineItems'>\n" +
    "                        {{::product.productId.name}} - Listed Price: {{::product.productId.price | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <hr style='border-top: black;'>\n" +
    "            </div>\n" +
    "            <div class=\"card-action\" id=\"offer-card-action\">\n" +
    "                <form name='offerForm'>\n" +
    "                    <div class=\"input-field col s12\">\n" +
    "                        <!--validation is hardcoded to orders with 1 item-->\n" +
    "                        <i class='tiny mdi-editor-attach-money prefix' style=\"color:black;\"></i>\n" +
    "                        <input id=\"modify-input\" name='offerCtrl' class='black-text validate' type='text' placeholder='00' ng-model='offer.orderTotal' ui-validate=\"'$value <= offer.lineItems[0].productId.price && $value>0 && $value %1 ===0 '\"></input>\n" +
    "                        <div ng-show=\"offerForm.$invalid && offerForm.offerCtrl.$touched\" class=\"col s12 center-align\">Offers must be whole dollar values less than or equal to the listed price.</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <button ng-disabled='!offerForm.$valid' class='btn col s6' ng-click=\"modifyOffer({offer: offer}); isBeingModified=false\">Submit</button>\n" +
    "                </form>\n" +
    "                <button type='button' ng-click=\"isBeingModified=false\" class='btn red darken-2 col s6'>Don't Modify</button>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- End Modify Form -->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/offer/offer.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class='container'>\n" +
    "\t<h1>Your Offers:</h1>\n" +
    "  <div class='row'>\n" +
    " \n" +
    "      <your-offer-view class=\"col s12 m12 l6\" offer=\"offer\" modify-offer=\"modifyOffer(offer)\" cancel-offer='cancelOffer(offerId)' toggle-form=\"toggleCard()\" ng-repeat='offer in offers'></your-offer-view>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/products/confirmOrder.html',
    "<div class=\"container confirm-order\">\n" +
    "    <div ng-hide='submitted' class=\"row center-align\">\n" +
    "        <div>\n" +
    "            <h3>Confirm Your Offer</h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col s12 m12 l12\">\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Product Information</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">{{order.lineItems[0].name}}</div>\n" +
    "\n" +
    "                <div class=\"col s12 center-align\">Offer: {{order.lineItems[0].purchasePrice | currency}}</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.oneProductView({id: prodId})' class='btn red darken-2 col s12 center-align '>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Payment Information</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">Card Type: {{cardInfo.cardType}} </div>\n" +
    "                <div class=\"col s12 center-align\">Last Four Digits: {{cardInfo.last4}}</div>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.stripeInfo({id: prodId})' class='btn red darken-2 col s12 center-align'>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Shipping Address</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.name}} </div>\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.street1}} {{shippingAddress.street2}} </div>\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.city}} {{shippingAddress.state}} {{shippingAddress.zip}}</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.addressForm({id:prodId})' class='btn red darken-2 col s12 center-align'>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "\n" +
    "            <button id='submit' ng-disabled=\"clicked\" ng-click=\"submitOrder()\" class='col s12 center-align btn'>Submit Offer</button>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" ng-show='submitted'>\n" +
    "        <div class=\"col s12\">\n" +
    "            <h5>Sucess! Your offer has been submitted, and the seller now has 24 hours to respond. If your offer is accepted, your card will be charged {{order.lineItems[0].purchasePrice | currency}} and you will receive a confirmation email. Good luck!</h5> <!-- {{orderId}} -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/oneProductView/oneProductView.html',
    "<div class=\"row oneProductView\" resizable>\n" +
    "    <div ng-class='isPinned(windowWidth)' class=\"col s12 l3 m12\">\n" +
    "        <div class=\"card #ea80fc purple accent-1\" ng-hide='showtoken'>\n" +
    "            <div class=\"card-content grey-text text-darken-4 row\" ng-hide='confirmationMenu'>\n" +
    "                <span class=\"col s12 productName grey-text text-darken-4\"> {{product.name}} </span>\n" +
    "                <!-- <div class=\"col s12\">Seller: {{product.userId.username}}</div> -->\n" +
    "                <p class=\"col s12 desc grey-text text-darken-4\">{{product.desc}} </p>\n" +
    "                <div class='col s12'>\n" +
    "                    <h4 class=\"price\">List:  ${{product.price}} </h4>\n" +
    "                    <h4 class=\"strike\">Retail: ${{product.retailPrice}}</h4>\n" +
    "                </div>\n" +
    "                <div ng-hide='boughtItem' class='col s12'>\n" +
    "                    <form name='offerForm'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <i class='tiny mdi-editor-attach-money prefix'></i>\n" +
    "                            <input type='text' name='offer' class='validate' ng-model='offerPrice' placeholder='Your Offer Here' ui-validate=\"'$value <= product.price && $value > 0 && $value %1 === 0'\"></input>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"offerForm.$invalid && offerForm.offer.$touched\"class=\"col s12 center-align\">Offers must be whole dollar values less than or equal to the listed price.</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button ng-disabled='!offerForm.$valid' ng-click=\"submitOffer(offerPrice)\" class=\"offerButton col s8 offset-s2 waves-effect btn blue lighten-2 grey-text text-darken-4\"><i class=\"mdi-action-shopping-cart\"></i> &nbsp Offer</button>\n" +
    "                <form>\n" +
    "\n" +
    "                <a class=\"col s12 userLink blue-grey-text darken-4 btn-flat center-align\" ng-click='userRedirect()'>More From {{product.userId.username}}</a>\n" +
    "\n" +
    "             </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <!-- <button ng-click=\"userRedirect()\" class=\"col s12 waves-effect btn blue lighten-2 grey-text text-darken-4\">More from {{product.userId.username}}\n" +
    "        </button> -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col l6 offset-l6 s12 m12\">\n" +
    "        <div class='row'>\n" +
    "            <div ng-repeat=\"onePhotoUrl in product.photoUrls\">\n" +
    "                <div class='col l6 m6 s12 center'>\n" +
    "                    <img class=\"responsive-img\" src=\"{{onePhotoUrl}}\" />\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-controller='OneProductViewCtrl'>\n" +
    "            <chat chatlist='chatlist' addchat='addChat(newChat)'></chat>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/products/productCardView/productCardView.html',
    "<div class='productCard'>    \n" +
    "    <div class=\"card-directive\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12 m12 l12\">\n" +
    "                <div class=\"card\">\n" +
    "          \n" +
    "                    <a ng-href='products/{{product._id}}'>\n" +
    "                        <div class=\"card-image\">\n" +
    "                            <img ng-src=\"{{product.photoUrls[0]}}\">\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"card-action\" id=\"productSubtitle\">\n" +
    "                            <h6 class=\"username\"><a href='/users/{{product.userId.username}}'>by {{product.userId.username}}</a></h6>\n" +
    "                            <h3 class=\"productName\">{{product.name}}</h3>\n" +
    "                            <h3 class=\"productName\"><em>Condition:</em> {{product.condition}}</h3>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"card-action\" id=\"productDescInCard\">\n" +
    "                            <p class=\"description\">{{product.desc}}</p>\n" +
    "                            <h4 class='price'>{{product.price | currency:undefined:0}}</h4>\n" +
    "                            <h4 class='strike'>{{product.retailPrice | currency:undefined:0}}</h4>\n" +
    "                        </div>\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"card-action\" id=\"productFavInCard\">\n" +
    "                        <div>\n" +
    "                            <a><i class='mdi-action-favorite' id='favoriteIcon' ng-class=\"{favorited: favorited}\" ng-click=\"toggleFavorite()\"></i></a>\n" +
    "                            <p id='productFavoriteDisplay'>{{likeText}}</p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/products.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class='container'>\n" +
    "\t<div ng-show='stateName && !submitted' class='center-align'>\n" +
    "\t\t<!-- <div  ng-hide='submitted' class='center-align'> -->\n" +
    "\t\tStep 1: <a ui-sref='products.stripeInfo({id: prodId})'>Payment Info</a> --\n" +
    "\t\tStep 2: <a ui-sref='products.addressForm({id: prodId})'>Shipping Address</a> --\n" +
    "\t\tStep 3: <a ui-sref='products.confirmOrder({id: prodId})'>Confirm Offer</a>\n" +
    "\t</div>\n" +
    "\t<div ui-view></div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/stripeForm.html',
    "<div class='col s12' >\n" +
    "    <form name=\"checkoutForm\" ng-submit=\"checkout()\">\n" +
    "\n" +
    "    <div class='form-group'>\n" +
    "        <h5>Before putting in an offer, you must provide payment details. All offers expire after 24 hours, and your card <em>will not</em> be charged unless the seller accepts your bid within the 24 hour period.</h5>\n" +
    "    </div>\n" +
    "    <div class=\"form-panel\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input type=\"text\" class=\"form-control credit\" ng-model=\"ccinfo.number\" payments-validate=\"card\" payments-format=\"card\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>CVC</label>\n" +
    "                <input type=\"text\" class=\"form-control cvc\" ng-model=\"ccinfo.cvc\" payments-validate=\"cvc\" payments-format=\"cvc\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>Expiration</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"ccinfo.expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" ng-required=\"true\" placeholder='mm/yy'>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group center-align\">\n" +
    "        <button type=\"submit\" class=\"waves-effect waves-light btn blue darken-2\" ng-disabled=\"checkoutForm.$invalid\">Submit</button>\n" +
    "        <button type=\"button\" class=\"btn red darken-2\" ui-sref='products.oneProductView({id:prodId})'>Cancel</button>\n" +
    "    </div>\n" +
    "</form>\n" +
    "</div>"
  );


  $templateCache.put('app/profile/profile.html',
    "<div class=\"container\">\n" +
    "  This is the Profile View\n" +
    "  <p>The delete user and user index api routes are restricted to users with the 'admin' role.</p>\n" +
    "  <ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"user in users\">\n" +
    "        <strong>{{user.name}}</strong><br>\n" +
    "        <span class=\"text-muted\">{{user.email}}</span>\n" +
    "        <a ng-click=\"delete(user)\" class=\"trash\"><span class=\"glyphicon glyphicon-trash pull-right\"></span></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );


  $templateCache.put('app/review/review.html',
    "<div>this is the review directive</div>"
  );


  $templateCache.put('app/sidenav/brandSidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='brands' class=\"md-sidenav-left\">\n" +
    "    <h1>Brands</h1>\n" +
    "  <ul >\n" +
    "    <li ng-click=\"onItemClick({selection: item})\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/categorySidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='categories' class=\"md-sidenav-left\">\n" +
    "    <h1>Categories</h1>\n" +
    "    <h4>Click to add or remove</h4>\n" +
    "  <ul>\n" +
    "    <li ng-class='toggleActive(item.name)'ng-init\"toggleActive()\" ng-click=\"onItemClick({selection: item}) ; toggleActive()\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/conditionSidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='conditions' class=\"md-sidenav-left\">\n" +
    "    <h1>Condition</h1>\n" +
    "  <ul>\n" +
    "    <li ng-click=\"onItemClick({selection: item})\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/userSidenav.html',
    ""
  );


  $templateCache.put('app/users/add_product/add_product.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "<!-- need to workout conflicts with this and sidenavs -->\n" +
    "\n" +
    "<script>\n" +
    "$(document).ready(function() {\n" +
    "    $('ul.tabs').tabs();\n" +
    "});\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class='row'>\n" +
    "        <div>\n" +
    "            <h5><i class=\"mdi-action-loyalty\"></i> Add a Product</h5>\n" +
    "            <h6><i class='mdi-action-star-rate'></i> = Required Field</h4h6>\n" +
    "        </div>\n" +
    "          \n" +
    "        <br></br>\n" +
    "        <div class=\"row\">\n" +
    "          <form name='addProductForm' class=\"col l8 m7 s12\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col l12 m12 s12\">\n" +
    "                  <label class=\"custom-file-upload btn btn-primary purple lighten-2\">\n" +
    "                        <input id=\"file-upload\" type=\"file\" capture='camera' accept=\"image/*\" onchange=\"angular.element(this).scope().upload()\"></input>\n" +
    "                        <i class=\"mdi-image-add-to-photos\"></i> Upload Photos\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\"> \n" +
    "                <div class=\"col l12 m12 s12\">\n" +
    "                    <div class='col s12 m6 l6' ng-repeat='photo in newProduct.photoUrls'>\n" +
    "                        <img class='uploadWidth' ng-src=\"{{photo}}\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <input id=\"productName\" name='name' type=\"text\" class=\"validate\" ng-model='newProduct.name' ng-required=\"true\">\n" +
    "                <label for=\"productName\">Product Name *</label>\n" +
    "\n" +
    "                <span ng-show='addProductForm.name.$error.required && addProductForm.name.$touched'>Requires product name</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\">  \n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <input id=\"description\" name='desc' type=\"text\" class=\"validate\" ng-model=\"newProduct.description\" ng-required='true'ui-validate=\"'$value.length > 10'\">\n" +
    "                <label for=\"description\" >Desciption *</label>\n" +
    "\n" +
    "                 <span ng-show='addProductForm.desc.$error.required && addProductFor.desc.$touched'>Requires product description</span>\n" +
    "                 <span ng-show='addProductForm.desc.$invalid && addProductForm.desc.$touched'>Description needs to be longer than 10 characters</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <button type='brand' ng-click='chooseBrand()' class='col s12 m12 l12 btn btn-primary light-blue'>{{brandButton}}</button>\n" +
    "                <div ng-show='showBrands' class=\"row\">\n" +
    "                    <div class=\"col s12\">\n" +
    "                        <ul ng-repeat='brand in availableBrands' class=\"tabs\">\n" +
    "                            <li class=\"tab col s3\"><a ng-click='selectBrand(brand.name)'>{{brand.name}}</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col l12 m12 s12\">\n" +
    "                    <button ng-click='chooseCategory()' class='col s12 m12 l12 btn btn-primary purple lighten-1'>{{categoryButton}} </button>\n" +
    "                    <div ng-show='showCategories' class=\"row\">\n" +
    "                        <div class=\"col s12\">\n" +
    "                            <ul ng-repeat='category in availableCategories' class=\"tabs\">\n" +
    "                                <li class=\"tab col s3\"><a ng-click='selectCategory(category.name)'>{{category.name}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col l12 m12 s12\">\n" +
    "                <button ng-click='chooseCondition()' class='col s12 m12 l12 btn btn-primary green lighten-1'>{{conditionButton}}</button>\n" +
    "                    <div ng-show='showConditions' class=\"row\">\n" +
    "                        <div class=\"col s12\">\n" +
    "                            <ul ng-repeat='condition in availableConditions' class=\"tabs\">\n" +
    "                                <li class=\"tab col s3\"><a ng-click='selectCondition(condition.name)'>{{condition.name}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">  \n" +
    "              <div class=\"input-field col l6 m6 s6\">\n" +
    "                <i class='mdi-editor-attach-money prefix'></i>\n" +
    "                <input id=\"retailPrice\" name='retailPrice' type=\"tel\" class=\"validate\" ng-model=\"newProduct.retailPrice\" ng-required=\"true\" ng-pattern=\"/^[1-9]\\d*$/\">\n" +
    "                <label for=\"retailPrice\">Retail Price*</label>\n" +
    "                <span ng-show='addProductForm.retailPrice.$error.pattern'>Prices must be a positive number</span> \n" +
    "                <span ng-show='addProductForm.retailPrice.$error.required && addProductForm.retailPrice.$touched'>Requires retail price</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"input-field col l6 m6 s6\">\n" +
    "                <i class='mdi-editor-attach-money prefix'></i>\n" +
    "                <input id=\"price\"name='price' type=\"tel\" class=\"validate\" ng-model=\"newProduct.price\" ng-required=\"true\" ng-pattern=\"/^[1-9]\\d*$/\">\n" +
    "                <label for=\"price\">Selling Price*</label>\n" +
    "\n" +
    "                <span ng-show='addProductForm.price.$error.pattern && addProductForm.price.$touched'>Prices must be a positive number</span> \n" +
    "                <span ng-show='addProductForm.price.$error.required && addProductForm.price.$touched'>Requires retail price</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col s12\">\n" +
    "               <button ng-click='addProduct(newProduct)' class='btn btn-primary' ng-disabled=\"addProductForm.$invalid\">Add Product</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/followers/followers.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <h4>{{user.username}}'s Followers</h4>\n" +
    "    <br>\n" +
    "   <div class=\"col s12 m8 offset-m2 l6 offset-l3\" ng-repeat='user in user.followers'>\n" +
    "        <div class=\"card-panel purple lighten-3 z-depth-1\" id='followerCard'>\n" +
    "          <div class=\"row valign-wrapper\">\n" +
    "            <div class=\"col s2\">\n" +
    "              <img src=\"{{user.picture}}\" alt=\"\" class=\"circle responsive-img profile\"> <!-- notice the \"circle\" class -->\n" +
    "            </div>\n" +
    "            <div class=\"col s10\">\n" +
    "              <span class=\"black-text\">\n" +
    "                <h5>{{user.username}}</h5>\n" +
    "                <h6>{{user.description}}</h6>\n" +
    "                 <h6>Blog: <a href='{{user.blog}}'>{{user.blog}}</a></h6>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/followers/following.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <h4>{{user.username}}'s Following</h4>\n" +
    "    <br>\n" +
    "   <div class=\"col s12 m8 offset-m2 l6 offset-l3\" ng-repeat='user in user.following'>\n" +
    "        <div class=\"card-panel purple lighten-3 z-depth-1\" id='followerCard'>\n" +
    "          <div class=\"row valign-wrapper\">\n" +
    "            <div class=\"col s2\">\n" +
    "              <img src=\"{{user.picture}}\" alt=\"\" class=\"circle responsive-img profile\"> <!-- notice the \"circle\" class -->\n" +
    "            </div>\n" +
    "            <div class=\"col s10\">\n" +
    "              <span class=\"black-text\">\n" +
    "                <h5>{{user.username}}</h5>\n" +
    "                <h6>{{user.description}}</h6>\n" +
    "                <h6>Blog: <a href='{{user.blog}}'>{{user.blog}}</a></h6>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/users.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class='userview'>\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <div class=\"row\">\n" +
    "        <div ng-class='isPinned(windowWidth)' class=\"col s12 l3 m12\">\n" +
    "            <div class=\"card #ea80fc purple accent-1\">\n" +
    "                <div class=\"card-content  grey-darken-4-text \">\n" +
    "                    <div class='profile'>\n" +
    "                        <img class=\"responsive-img circle profile\" src=\"{{user.picture}}\">\n" +
    "                        <p class=\"card-title grey-text text-darken-4\" id=\"username\">{{user.username}} </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <p id='aboutMeTitle'>About me:</p>\n" +
    "                    <p id='aboutMeText'>{{user.description}} </p>\n" +
    "                    <p id='aboutMeBlog'>Blog: <a href='{{user.blog}}'> {{user.blog}}</a> </p>\n" +
    "                    <br/>\n" +
    "\n" +
    "                        <table id='tableStats'>\n" +
    "                            <thead id='theadintable'>\n" +
    "                                <tr>\n" +
    "                                    <th class='tableTitle' data-field=\"listing\">Listings</th>\n" +
    "                                    <th class='tableTitle' data-field=\"followers\">Followers</th>\n" +
    "                                    <th class='tableTitle' data-field=\"following\">Following</th>\n" +
    "                                </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                                <tr>\n" +
    "                                    <td class='tableData'>{{user.listedProducts.length}}</td>\n" +
    "                                    <td class='tableData'><a href='/users/{{user.username}}/followers'>{{user.followers.length}}</a></td>\n" +
    "                                    <td class='tableData'><a href='/users/{{user.username}}/following'>{{user.following.length}}</a></td>\n" +
    "                                </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"section followingButtons\">\n" +
    "                        <a ng-click='toggleFollow()' class=\"waves-effect btn blue lighten-2 grey-text text-darken-4 followText\">\n" +
    "                            <i class=\"mdi-action-favorite-outline\"></i> &nbsp {{toggleText}}\n" +
    "                            <i ng-show='followed' class='mdi-action-done'></i>\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-click='showReviews()' class=\"waves-effect waves-purple btn blue lighten-2 grey-text text-darken-4 sellerFeedback\"><i class=\"mdi-action-face-unlock\"></i>&nbsp {{buttonText}}</a>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div ng-show='review' class=\"card pink lighten-3\">\n" +
    "                <div ng-repeat='review in reviews' class=\"card-content grey-text text-darken-4\">\n" +
    "                    <img class=\"responsive-img profile circle\" src=\"{{review.reviewingUserId.picture}}\">\n" +
    "                    <p class=\"card-title grey-text text-darken-4\" id=\"username\">{{review.reviewingUserId.username}}</p>\n" +
    "                    <p id='reviewText'>{{review.text}} </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row col s12 m6 l6 offset-l6\">\n" +
    "            <ul class=\"col l12 m12 s12 list-unstyled\" ng-repeat=\"product in productList\">\n" +
    "                <product-card-view info=\"product\"></product-card-view>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('components/footer/footer.html',
    "<footer class=\"page-footer #ea80fc purple accent-1 site-footer\" >\n" +
    "     <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col l4 s12\">\n" +
    "                <h5 class=\"white-text\">Contact Us</h5>\n" +
    "                 <p><a class=\"grey-text text-lighten-3\" href=\"/about\">About Us</a></p>\n" +
    "                <p><a class=\"grey-text text-lighten-4\" href=\"mailto:sayHello@cornerfind.com\">sayHello@cornerFind.com</a></p>\n" +
    "                <p><a class=\"grey-text text-lighten-3\" href=\"/logins\">Login</a></p>\n" +
    "                <a class=\"grey-text text-lighten-3\" href=\"/signup\">Sign Up</a>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"footer-copyright\">\n" +
    "        <div class=\"container\">\n" +
    "               © 2015 CornerFind.com\n" +
    "            <div class=\"grey-text text-lighten-4 right\" >All rights reserved</div>\n" +
    "            <br>\n" +
    "            <br>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</footer>\n"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=\"modal-header\">\n" +
    "  <button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button>\n" +
    "  <h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p>\n" +
    "  <div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button>\n" +
    "</div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div resizable class=\"navbar navbar-default navbar-static-top purple accent-1\"  ng-controller=\"NavbarCtrl\">\n" +
    " <!--  <div class=\"container\"> -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button class=\"navbar-toggle\" type=\"button\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "        <span class=\"navbar-text sr-only\" id=\"whiten\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a href=\"/\" class=\"navbar-brand\" id=\"whiten\"><img src=\"assets/images/logo_cornerfind.png\" width=\"42\"/>&nbsp <div id='appname'>Cornerfind</div></a>\n" +
    "    </div>\n" +
    "    <div collapse=\"isCollapsed\" class=\"navbar-collapse collapse\" id=\"navbar-main\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <!-- keeping below line for ng-class reference\n" +
    "        <li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\">\n" +
    "        </li>\n" +
    "        -->\n" +
    "\n" +
    "        <!--dropdowns-->\n" +
    "\n" +
    "        <!-- CATEGORY DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if=\"!smallerThan768()\" class=\"btn-group\" dropdown is-open=\"status.openCategories\">\n" +
    "              <a  class =\"whiten\" id='custom-dropdown' ng-mouseover='toggleCategories($event)' ng-mouseleave='toggleCategories($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                Categories <span class=\"caret\"></span>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\"  ng-mouseleave='toggleCategories($event)'>\n" +
    "                <li  ng-repeat='category in categoryList'><a ng-click='categoryEmit(category.name)' ng-click='categoryEmit(category.name)'>{{category.name}}</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleCategories()' dropdown is-open=\"status.openCategories\">\n" +
    "              <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                Categories <span class=\"caret\"></span>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li  ng-repeat='category in categoryList'><a ng-click='categoryEmit(category.name)'>{{category.name}}</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "        <!-- BRAND DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if='!smallerThan768()' class=\"btn-group\" dropdown is-open=\"status.openBrands\">\n" +
    "            <a  class='whiten' id='custom-dropdown' ng-mouseover='toggleBrands($event)' ng-mouseleave='toggleBrands($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Brands <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-mouseleave='toggleBrands($event)'>\n" +
    "              <li ng-repeat='brand in brandList'><a ng-click='brandEmit(brand.name)'>{{brand.name}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleCategories()' dropdown is-open=\"status.openBrands\">\n" +
    "            <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Brands <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "              <li  ng-repeat='brand in brandList'><a ng-click='brandEmit(brand.name)'>{{brand.name}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- Gender DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if='!smallerThan768()' class=\"btn-group\" dropdown is-open=\"status.openGenders\">\n" +
    "            <a  class='whiten' id='custom-dropdown' ng-mouseover='toggleGenders($event)' ng-mouseleave='toggleGenders($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Gender <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-mouseleave='toggleGenders($event)'>\n" +
    "              <li ng-repeat='gender in genderList'><a ng-click='genderEmit(gender)'>{{gender}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleGenders()' dropdown is-open=\"status.openGenders\">\n" +
    "            <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Gender <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "              <li  ng-repeat='gender in genderList'><a ng-click='genderEmit(gender)'>{{gender}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "        <!--end dropdowns-->\n" +
    "\n" +
    "        <li ng-show=\"isAdmin()\" ng-class=\"{active: isActive('/admin')}\"><a href=\"/admin\">Admin</a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a ui-sref=\"signup\" id='whiten'>Sign up</a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/login')}\"><a ui-sref=\"login\" id='whiten'>Login</a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><p id='whiten' class=\"navbar-text\">Hi {{currentUser.name}}!</p> </li>\n" +
    "        <!-- <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a class='whiten' id='whiten' ui-sref=\"offer\">Your Offers</a></li> -->\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/settings')}\"><a ui-sref='account'><span class=\"glyphicon glyphicon-cog whiten\"></span></a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a class='whiten' id='whiten' href=\"\" ng-click=\"logout()\">Logout</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "<!--   </div> -->\n" +
    "</div>\n"
  );

}]);
