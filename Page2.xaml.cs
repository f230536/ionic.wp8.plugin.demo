using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace com.ionicframework.threeinone808391
{
    public partial class Page2 : PhoneApplicationPage
    {
        public Page2()
        {
            InitializeComponent();
        }
        protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            //  If we navigated to this page
            // from the MainPage, the DefaultTitle parameter will be "FromMain".  If we navigated here
            // when the secondary Tile was tapped, the parameter will be "FromTile".
            textBlockFrom.Text = "Navigated here from " + this.NavigationContext.QueryString["NavigatedFrom"];

        }
    }
}