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

#import "RCTConvert+FIRLoggerLevel.h"
#import "RNFBFirestoreCollectionModule.h"
#import "RNFBFirestoreCommon.h"
#import "RNFBFirestoreDocumentModule.h"
#import "RNFBFirestoreModule.h"
#import "RNFBFirestoreQuery.h"
#import "RNFBFirestoreSerialize.h"
#import "RNFBFirestoreTransactionModule.h"

FOUNDATION_EXPORT double RNFBFirestoreVersionNumber;
FOUNDATION_EXPORT const unsigned char RNFBFirestoreVersionString[];

