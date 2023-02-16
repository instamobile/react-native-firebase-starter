#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RNFBStorageCommon.h"
#import "RNFBStorageModule.h"

FOUNDATION_EXPORT double RNFBStorageVersionNumber;
FOUNDATION_EXPORT const unsigned char RNFBStorageVersionString[];

