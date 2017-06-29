//
//  UserTokenManager.m
//  PJBCG
//
//  Created by WeiHu on 2017/6/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UserTokenManager.h"

static UserTokenManager * defaultManager = nil;
NSString * const APP_ISINSTALLED = @"APP_ISINSTALLED";
NSString * const USER_LOGIN_TOKEN = @"USER_LOGIN_TOKEN";
NSString * const USER_NORMAL_TOKEN = @"USER_NORMAL_TOKEN";

@implementation UserTokenManager

+ (UserTokenManager *)defaultManager{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    defaultManager = [[UserTokenManager alloc] init];
  });
  return defaultManager;
}
- (BOOL)isInstalled{
  return [[NSUserDefaults standardUserDefaults] boolForKey:APP_ISINSTALLED];
}
- (void)setIsInstalled:(BOOL)isInstalled{
  [[NSUserDefaults standardUserDefaults] setBool:isInstalled forKey:APP_ISINSTALLED];
  [[NSUserDefaults standardUserDefaults] synchronize];
}
- (NSString *)loginToken{
  return [[NSUserDefaults standardUserDefaults] objectForKey:USER_LOGIN_TOKEN];;
}
- (void)setLoginToken:(NSString *)loginToken{
  [[NSUserDefaults standardUserDefaults] setObject:loginToken forKey:USER_LOGIN_TOKEN];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

- (NSString *)normalToken{
  return [[NSUserDefaults standardUserDefaults] objectForKey:USER_NORMAL_TOKEN];;
}
- (void)setNormalToken:(NSString *)normalToken{
  [[NSUserDefaults standardUserDefaults] setObject:normalToken forKey:USER_NORMAL_TOKEN];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

@end
