//
//  UserTokenManager.h
//  PJBCG
//
//  Created by WeiHu on 2017/6/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UserTokenManager : NSObject

@property (nonatomic, assign) BOOL isInstalled;
@property (nonatomic, copy) NSString *loginToken;
@property (nonatomic, copy) NSString *normalToken;

+ (UserTokenManager *)defaultManager;

@end
